const dotenv = require('dotenv')
const App = require('../app')

async function main () {
  // intialize overseer app
  dotenv.config()
  const config = process.env
  const app = new App(config)

  const EMAIL = 'admin@email.com'
  const PASSWORD = 'admin123'
  try {
    await app.users.authenticate(EMAIL, PASSWORD)
  } catch (error) {
    if (error instanceof app.constructor.errors.ResourceSearchError) {
      await app.users.create({
        name: 'Admin',
        email: 'admin@email.com',
        password: 'admin123'
      })
    } else {
      console.log(error)
    }
  }

  process.exit()
}

main()
