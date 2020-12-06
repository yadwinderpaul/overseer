const { ResourceWriteError } = require('../errors')

class StatusUpdates {
  constructor ({ config, logger, dbConnection }) {
    this.config = config
    this.logger = logger
    this.dbConnection = dbConnection
    this.PASSWORD_SALT = config.PASSWORD_SALT
  }

  async getLatestByUserIdAndServiceId (userId, serviceId) {
    return this.dbConnection
      .query(
        `select created_at, status from status_updates
        where service_id = (
          select id from services where user_id = $1::uuid and id = $2::uuid
        )
        and created_at > now() - '24 hours'::interval
        order by created_at limit 30;`,
        [userId, serviceId]
      )
  }

  async create (serviceId, status) {
    return this.dbConnection
      .query(
        'insert into status_updates(service_id, status) values($1::uuid, $2::boolean) returning service_id, status',
        [serviceId, status]
      )
      .then(rows => {
        if (rows.length === 0) {
          const error = new Error('No status update created')
          error.details = { serviceId, status }
          throw error
        }
        return rows[0]
      })
      .catch(err => {
        throw new ResourceWriteError(err)
      })
  }
}

module.exports = StatusUpdates
