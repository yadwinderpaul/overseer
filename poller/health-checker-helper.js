class HealthCheckerHelper {
  constructor ({ app }) {
    this.config = app.config
    this.logger = app.logger
    this.healthChecker = app.healthChecker
    this.statusUpdates = app.statusUpdates
  }

  async run (job) {
    const service = job.data

    console.log(`health checking "${service.name}" service`)
    const status = await this.healthChecker.check(service)
    console.log(`status: ${status}`)

    // save the status update to db
    await this.statusUpdates.create(service.id, status)
    console.log('saved status in DB')

    return true
  }

  completedSync (job, returnvalue) {
    console.log(`health check completed for "${job.name}"`)
  }

  failedSync (job, failedReason) {
    console.log(`"${job.name}" health check failed with reason: "${failedReason}"`)
  }
}

module.exports = HealthCheckerHelper
