module.exports = app => {
  const { ResourceSearchError, ResourceWriteError } = app.constructor.errors

  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      app.logger.info('An error occured')
      console.log(error)
      if (error instanceof ResourceSearchError) {
        ctx.status = 404
      } else if (error instanceof ResourceWriteError) {
        ctx.status = 400
      } else {
        ctx.status = 500
      }
      ctx.body = { error: error.toString() }
    }
  }
}
