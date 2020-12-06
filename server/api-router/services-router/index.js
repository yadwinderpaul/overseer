const Router = require('@koa/router')
const CheckAuth = require('../../middleware/check-auth')
const Controller = require('./controller')

module.exports = (app) => {
  const checkAuth = CheckAuth(app)
  const ctrl = Controller(app)

  const router = new Router({ prefix: '/services' })
  router.use(checkAuth)
  router.get('/', ctrl.list)
  router.get('/:id', ctrl.get)
  router.get('/:id/status-updates', ctrl.statusUpdates)
  router.post('/', ctrl.create)
  router.put('/:id', ctrl.update)
  router.delete('/:id', ctrl.del)
  return router
}
