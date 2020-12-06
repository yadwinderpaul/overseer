module.exports = app => {
  const logger = app.logger
  return async (ctx, next) => {
    logger.info('received request', ctx.path)
    console.log('ctx.request.body', ctx.request.body)
    await next()
    logger.info('sent response')
  }
}
