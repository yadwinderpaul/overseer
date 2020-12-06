const _ = require('lodash')
const { DatabaseError } = require('../errors')

/**
 * This class provides API for connection with postgres DBMS
 * by using the connection pool instance
 */
class DbConnection {
  constructor ({ config, logger, pool }) {
    this.config = config
    this.logger = logger
    this.pool = pool
  }

  query () {
    this.logger.debug('querying DB')
    this.logger.debug(arguments[0])
    return this.pool
      .query(...arguments)
      .then(result => {
        this.logger.debug('queried DB successfully')
        return this._toCamelCase(result.rows)
      })
      .catch(err => {
        this.logger.debug('error in querying DB')
        this.logger.debug(err)
        throw new DatabaseError(err)
      })
  }

  _toCamelCase (values) {
    return values.map(val => {
      return _.mapKeys(val, (v, k) => _.camelCase(k))
    })
  }
}

module.exports = DbConnection
