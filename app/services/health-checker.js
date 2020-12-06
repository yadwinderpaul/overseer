const axios = require('axios')

/**
 * This service contains the logic for checkign the health
 * of an input service.
 * Currently this service takes very basic inputs of only method and endpoint
 * but this can be extended to use headers, data, etc.
 * Also it currently returns only boolean statuses, but we can extend the API
 * by returning the exact request and response or error encoutnered
 */
class HealthChecker {
  constructor ({ config, logger }) {
    this.config = config
    this.logger = logger
  }

  async check (service) {
    const { method, endpoint: url } = service
    const timeout = 10000 // 10 secs
    try {
      const res = await axios({ method, url, timeout })
      this.logger.debug('received response')
      return res.status === 200
    } catch (error) {
      this.logger.debug('error in calling service')
      this.logger.debug(error)
      return false
    }
  }
}

module.exports = HealthChecker
