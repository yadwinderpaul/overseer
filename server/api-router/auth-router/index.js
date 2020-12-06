const Router = require('@koa/router')
const Controller = require('./controller')

module.exports = app => {
  const ctrl = Controller(app)

  const router = new Router({ prefix: '/auth' })
  router.post('/login', ctrl.login)
  return router
}
