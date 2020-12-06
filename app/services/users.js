const bcrypt = require('bcrypt')
const { ResourceSearchError, ResourceWriteError } = require('../errors')

/**
 * This class provides persistence API for the app's users
 * The main dependency is the DB connection object
 */
class Users {
  constructor ({ config, logger, dbConnection }) {
    this.config = config
    this.logger = logger
    this.dbConnection = dbConnection
    this.PASSWORD_SALT = config.PASSWORD_SALT
  }

  async getById (id) {
    return this.dbConnection
      .query('select id, name, email from users where id = $1::uuid;', [id])
      .then(rows => {
        if (rows.length === 0) {
          const error = new Error('No user found')
          error.details = { id }
          throw error
        }
        return rows[0]
      })
      .catch(err => {
        throw new ResourceSearchError(err)
      })
  }

  /**
   * Create a new user into DB
   * Receives password as text and converts it into hash
   * before saving the DB
   */
  async create (data) {
    const { name, email, password } = data
    const passhash = await this._hash(password)
    return this.dbConnection
      .query(
        'insert into users(name, email, passhash) values($1::text, $2::citext, $3::text) returning id, name, email',
        [name, email, passhash]
      )
      .then(rows => {
        if (rows.length === 0) {
          const error = new Error('No user created')
          error.details = { data }
          throw error
        }
        return rows[0]
      })
      .catch(err => {
        throw new ResourceWriteError(err)
      })
  }

  /**
   * Searches for a user in DB using email and password text
   * Queries the DB with a password hash
   */
  async authenticate (email, password) {
    const passhash = await this._hash(password)
    return this.dbConnection
      .query(
        'select id, name, email from users where email = $1::citext and passhash = $2::text;',
        [email, passhash]
      )
      .then(rows => {
        if (rows.length === 0) {
          const error = new Error('No user found')
          error.details = { email, password }
          throw error
        }
        return rows[0]
      })
      .catch(err => {
        throw new ResourceSearchError(err)
      })
  }

  /**
   * Creates hash for password texts using bcrypt module with a fixed salt
   * The safety can be greatly improved by saving salts for every user,
   * but for this small app a global salt is used
   */
  async _hash (password) {
    return bcrypt.hash(password, this.PASSWORD_SALT)
  }
}

module.exports = Users
