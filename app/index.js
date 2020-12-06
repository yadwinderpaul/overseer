const util = require('util')
const { Pool } = require('pg')
const winston = require('winston')
const DbConnection = require('./database/db-connection')
const Users = require('./services/users')
const Services = require('./services/services')
const StatusUpdates = require('./services/status-updates')
const HealthChecker = require('./services/health-checker')
const errors = require('./errors')

/**
 * This is core Overseer application containing all business logic
 * and API services to interact with all the dependencies.
 *
 * Manually creating instances of services since this is a small app,
 * otherwise a small dependency injection library can be used
 */
class App {
  constructor (config) {
    this.config = config

    /**
     * Using a common logger for all of the application
     * File transports and Remote logging transports can be added
     * for production usage
     */
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format(info => {
          info.message = util.inspect(info.message)
          return info
        })(),
        winston.format.simple()
      ),
      level: this.config.LOG_LEVEL,
      transports: [
        new winston.transports.Console()
      ]
    })

    /**
     * Create a DB connection pool instance for usage across the app
     * with a sensible max number of connections
     */
    this.pool = new Pool({
      connectionString: this.config.DB_CNXN_STRING,
      max: 25
    })

    this.dbConnection = new DbConnection({
      config: this.config,
      logger: this.logger,
      pool: this.pool
    })
    this.users = new Users({
      config: this.config,
      logger: this.logger,
      dbConnection: this.dbConnection
    })
    this.services = new Services({
      config: this.config,
      logger: this.logger,
      dbConnection: this.dbConnection
    })
    this.statusUpdates = new StatusUpdates({
      config: this.config,
      logger: this.logger,
      dbConnection: this.dbConnection
    })
    this.healthChecker = new HealthChecker({
      config: this.config,
      logger: this.logger
    })
  }
}

App.errors = errors
module.exports = App
