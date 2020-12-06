const { Queue, Worker, QueueScheduler } = require('bullmq')
const dotenv = require('dotenv')
const App = require('../app')
const PollerHelper = require('./poller-helper')
const HealthCheckerHelper = require('./health-checker-helper')

/**
 * Polling in Overseer works with the help of 2 Redis backed queues
 * - POLLER: This queue is regularly inserted with task to query all the services
 * registered in the DB for continuous health check. And for each service insert tasks
 * for checking health of service.
 * - HEALTH_CHECKER: This queue takes a service object as task data and workers attached
 * to this queue calls health check on that service and saves the info in the DB
 */
async function main () {
  // intialize the Overseer app
  dotenv.config()
  const config = process.env
  const app = new App(config)

  const pollerQueueName = 'POLLER'
  const healthCheckerQueueName = 'HEALTH_CHECKER'
  const pollerQueue = new Queue(pollerQueueName, { connection: config.REDIS_CNXN_STRING })
  const healthCheckerQueue = new Queue(healthCheckerQueueName, { connection: config.REDIS_CNXN_STRING })
  // POLLER queue also needs a scheduler to repeatable tasks
  const queueScheduler = new QueueScheduler(pollerQueueName)

  // attach worker for POLLER queue
  const pollerHelper = new PollerHelper({ app, healthCheckerQueue })
  const pollerWorker = new Worker(pollerQueueName, pollerHelper.run.bind(pollerHelper))
  pollerWorker.on('failed', pollerHelper.failedSync.bind(pollerHelper))
  pollerWorker.on('completed', pollerHelper.completedSync.bind(pollerHelper))

  // attach worker for HEALTH_CHECKER queue
  const healthCheckerHelper = new HealthCheckerHelper({ app })
  const healthCheckerWorker = new Worker(healthCheckerQueueName, healthCheckerHelper.run.bind(healthCheckerHelper))
  healthCheckerWorker.on('failed', healthCheckerHelper.failedSync.bind(healthCheckerHelper))
  healthCheckerWorker.on('completed', healthCheckerHelper.completedSync.bind(healthCheckerHelper))

  /**
   * This section initializes the POLLER queue with
   * a repeatable task
   */
  // drain already present repeatable jobs
  const jobs = await pollerQueue.getRepeatableJobs()
  for (const job of jobs) {
    await pollerQueue.removeRepeatableByKey(job.key)
  }

  // add a repeatable job to pollerQueue
  const jobName = 'polling job'
  const HEALTH_CHECK_INTERVAL_SECONDS = config.HEALTH_CHECK_INTERVAL_SECONDS
  await pollerQueue.add(jobName, {}, {
    jobId: jobName,
    repeat: {
      every: HEALTH_CHECK_INTERVAL_SECONDS * 1000 // milliseconds
    }
  })
  app.logger.info('added the intial polling repeatable job')
}

main().catch(err => {
  console.log(err)
})
