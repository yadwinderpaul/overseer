const jsonwebtoken = require('jsonwebtoken')

module.exports = app => {
  const JWT_KEY = app.config.JWT_KEY

  return async (ctx, next) => {
    const jwt = ctx.headers.authorization
    const userId = jsonwebtoken.verify(jwt, JWT_KEY)
    ctx.state.userId = userId
    await next()
  }
}
