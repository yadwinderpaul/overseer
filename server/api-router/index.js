const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const LoggerMiddleware = require('../middleware/logger')
const ErrorHandler = require('../middleware/error-handler')
const AuthRouter = require('./auth-router')
const ServicesRouter = require('./services-router')

module.exports = app => {
  const router = new Router({ prefix: '/api' })
  const authRouter = AuthRouter(app)
  const servicesRouter = ServicesRouter(app)

  // parse json body
  router.use(bodyParser())
  // log request and response
  router.use(LoggerMiddleware(app))
  // error handler
  router.use(ErrorHandler(app))

  router
    .use(authRouter.routes())
    .use(authRouter.allowedMethods())
  router
    .use(servicesRouter.routes())
    .use(servicesRouter.allowedMethods())

  return router
}
