class PollerHelper {
  constructor ({ app, healthCheckerQueue }) {
    this.config = app.config
    this.logger = app.logger
    this.services = app.services
    this.healthCheckerQueue = healthCheckerQueue
  }

  async run (job) {
    console.log('querying all services')
    const services = await this.services.all()
    console.log(`adding ${services.length} services to health checker queue`)

    const promises = []
    services.forEach(service => {
      promises.push(
        this.healthCheckerQueue.add(service.name, service)
      )
    })
    await Promise.all(promises)
    console.log('added all to health checker')

    return true
  }

  completedSync (job, returnvalue) {
    console.log(`pollng job completed for "${job.name}"`)
  }

  failedSync (job, failedReason) {
    console.log(`"${job.name}" job failed with reason: "${failedReason}"`)
  }
}

module.exports = PollerHelper
