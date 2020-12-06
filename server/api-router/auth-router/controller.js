const jsonwebtoken = require('jsonwebtoken')

module.exports = app => {
  const users = app.users
  const JWT_KEY = app.config.JWT_KEY

  async function login (ctx) {
    const email = ctx.request.body.email
    const password = ctx.request.body.password
    const user = await users.authenticate(email, password)
    const jwt = jsonwebtoken.sign(user.id, JWT_KEY)
    const payload = { ...user, jwt }
    ctx.body = { payload }
  }

  return {
    login
  }
}
