module.exports = app => {
  async function list (ctx) {
    const userId = ctx.state.userId
    const payload = await app.services.listByUserId(userId)
    ctx.body = { payload }
  }

  async function get (ctx) {
    const userId = ctx.state.userId
    const id = ctx.params.id
    const payload = await app.services.getByUserIdAndId(userId, id)
    ctx.body = { payload }
  }

  async function create (ctx) {
    const userId = ctx.state.userId
    const { name, endpoint, description } = ctx.request.body
    const payload = await app.services.create({
      userId, name, endpoint, description
    })
    ctx.body = { payload }
  }

  async function update (ctx) {
    const userId = ctx.state.userId
    const id = ctx.params.id
    const { name, endpoint, description = null } = ctx.request.body
    const payload = await app.services.updateByUserIdAndId(
      { userId, id },
      { name, endpoint, description }
    )
    ctx.body = { payload }
  }

  async function del (ctx) {
    const userId = ctx.state.userId
    const id = ctx.params.id
    const payload = await app.services.deleteByUserIdAndId({ userId, id })
    ctx.body = { payload }
  }

  async function statusUpdates (ctx) {
    const userId = ctx.state.userId
    const id = ctx.params.id
    const payload = await app.statusUpdates.getLatestByUserIdAndServiceId(userId, id)
    ctx.body = { payload }
  }

  return {
    list,
    get,
    create,
    update,
    del,
    statusUpdates
  }
}
