const dotenv = require('dotenv')
const Koa = require('koa')
const koaSend = require('koa-send')
const App = require('../app')
const ApiRouter = require('./api-router')

async function main () {
  // intialize overseer app
  dotenv.config()
  const config = process.env
  const app = new App(config)

  // create instance of server
  const server = new Koa()

  // add api routes to server
  const apiRouter = ApiRouter(app)
  server
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())

  // webpack dev middleware
  if (app.config.NODE_ENV === 'development') {
    const koaWebpack = require('koa-webpack')
    const webpackConfig = require('../webpack.config.js')
    const middleware = await koaWebpack({
      config: {
        ...webpackConfig,
        mode: 'development'
      }
    })
    server.use(middleware)
  }

  // server static files from dist folder
  const serve = require('koa-static')
  server.use(serve('dist'))

  // fallbak to index.html
  server.use(async (ctx) => {
    await koaSend(ctx, 'client/index.html')
  })

  // run the server
  const SERVER_PORT = app.config.SERVER_PORT
  server.listen(SERVER_PORT, () => {
    console.log(`Node server listening at http://localhost:${SERVER_PORT}`)
  })
}

main()
