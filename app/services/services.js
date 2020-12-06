const { ResourceSearchError, ResourceWriteError } = require('../errors')

/**
 * This class provides persistence API for all services we
 * want to monitor for regular health checks
 */
class Services {
  constructor ({ config, logger, dbConnection }) {
    this.config = config
    this.logger = logger
    this.dbConnection = dbConnection
  }

  async all () {
    return this.dbConnection
      .query('select id, name, endpoint, description from services;')
  }

  /**
   * Returns a list of all the services registered by a user
   * along with the latest status update of their health check
   */
  async listByUserId (userId) {
    return this.dbConnection
      .query(
        `select distinct on (svc.id)
          svc.id, svc.name, svc.endpoint, svc.description, svc.created_at, svc.updated_at,
          upd.status, upd.created_at as status_created_at
        from services svc
        left join status_updates upd on upd.service_id = svc.id
        where svc.user_id = $1::uuid
        order by svc.id, upd.created_at desc;`,
        [userId]
      )
  }

  async getByUserIdAndId (userId, id) {
    return this.dbConnection
      .query(
        `select distinct on (svc.id)
          svc.id, svc.name, svc.endpoint, svc.description, svc.created_at, svc.updated_at,
          upd.status, upd.created_at as status_created_at
        from services svc
        left join status_updates upd on upd.service_id = $2::uuid
        where svc.user_id = $1::uuid and svc.id = $2::uuid
        order by svc.id, upd.created_at desc;`,
        [userId, id]
      )
      .then(rows => {
        if (rows.length === 0) {
          const error = new Error('No service found')
          error.details = { userId, id }
          throw error
        }
        return rows[0]
      })
      .catch(err => {
        throw new ResourceSearchError(err)
      })
  }

  /**
   * Create a service parameterized against a user
   * The data structure currently restricts a user to see
   * services only registerd by them
   */
  async create (data) {
    const { userId, name, endpoint, description = null } = data
    return this.dbConnection
      .query(
        `insert into services(user_id, name, endpoint, description)
        values($1::uuid, $2::text, $3::text, $4::text) returning id, name, endpoint, description`,
        [userId, name, endpoint, description]
      )
      .then(rows => {
        if (rows.length === 0) {
          const error = new Error('No service created')
          error.details = { data }
          throw error
        }
        const { id } = rows[0]
        return this.getByUserIdAndId(userId, id)
      })
      .catch(err => {
        throw new ResourceWriteError(err)
      })
  }

  async updateByUserIdAndId (inputs, data) {
    const { userId, id } = inputs
    const { name, endpoint, description = null } = data
    return this.dbConnection
      .query(
        `update services
        set (name, endpoint, description) = ($3::text, $4::text, $5::text)
        where (user_id, id) = ($1::uuid, $2::uuid)
        returning id, name, endpoint`,
        [userId, id, name, endpoint, description]
      )
      .then(rows => {
        if (rows.length === 0) {
          const error = new Error('Service not updated')
          error.details = { inputs, data }
          throw error
        }
        const { id } = rows[0]
        return this.getByUserIdAndId(userId, id)
      })
      .catch(err => {
        throw new ResourceWriteError(err)
      })
  }

  async deleteByUserIdAndId (data) {
    const { userId, id } = data
    return this.dbConnection
      .query(
        `delete from services where user_id = $1::uuid and id = $2::uuid
        returning id, name, endpoint, description`,
        [userId, id]
      )
      .then(rows => {
        if (rows.length === 0) {
          const error = new Error('No service deleted')
          error.details = { data }
          throw error
        }
        return rows[0]
      })
      .catch(err => {
        throw new ResourceWriteError(err)
      })
  }
}

module.exports = Services
