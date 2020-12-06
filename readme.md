# Overseer
A simple service poller which 'oversees' the health of registered HTTP services.
The app is divide into 4 sections:
- The main application containing all business logic and APIs to the dependencies of the app
- Polling queue and workers which checks health of registered services asynchronously
- HTTP application using KoaJS, providing http APIs to the application
- Web application using ReactJS


# Major Dependencies

- `ReactJS` is used as a client side framework for listing the registered services, viewing their statuses, registering new services, modifying and deleting currently registered.
- `KoaJS` is a lightweight wrapper over NodeJS http server which is used for providing http APIs for Overseer app
- `BullMQ` is a Redis based queue implementation which is used for the polling of registered services asynchronously and independently.
- `PostgreSQL` is used as persistence


# Running and Setup on local
- Requirements:
    - NodeJS > 12, install from [here](https://nodejs.org/en/download/)
    - PostgreSQL > 9, server can be installed natively or run from the provided `docker-compose.yml` file
    - Redis, server can be installed natively or run from the provided `docker-compose.yml` file
- If using docker, run `docker-compose up -d`
- Create a `.env` file from copying from `.env.example` and input correct variables for your environment
- `npm install`
- `npm run migrate up` to setup the database
- `npm run seed` to create default user account
- `npm run poller` to start the health check service
- `npm start` to start the web server
- Open `http://localhost:3000` in the browser
- Use email: `admin@email.com` and password: `admin123` to login


# Testing
The app does not have a lot of coverage. There are some unit tests added to showcase testing for server-side as well as client-side, which can be similarly added to other services and compoenents.
Command for running tests: `npm test`
