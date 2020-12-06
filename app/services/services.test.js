const Services = require('./services')
const { ResourceSearchError, ResourceWriteError } = require('../errors')

const config = {}
let loggerMock
let queryMock
let dbConnectionMock
let services

const SERVICE = {
  id: 'TEST_SERVICE_ID',
  name: 'TEST_SERVICE_NAME',
  endpoint: 'TEST_SERVICE_ENDPOINT',
  description: 'TEST_SERVICE_DESCRIPTION',
  userId: 'TEST_SERVICE_NAME'
}

describe('Services', () => {
  beforeEach(() => {
    loggerMock = {
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn()
    }
    queryMock = jest.fn().mockReturnValue(
      Promise.resolve([SERVICE])
    )
    dbConnectionMock = {
      query: queryMock
    }
    services = new Services({
      config,
      logger: loggerMock,
      dbConnection: dbConnectionMock
    })
  })

  describe('getByUserIdAndId', () => {
    it('calls db query with correct params', async () => {
      await services.getByUserIdAndId(SERVICE.userId, SERVICE.id)
      expect(queryMock).toBeCalledWith(expect.anything(), [SERVICE.userId, SERVICE.id])
    })

    it('returns row returned by db query', async () => {
      const res = await services.getByUserIdAndId(SERVICE.userId, SERVICE.id)
      expect(res).toStrictEqual(SERVICE)
    })

    it('throws ResourceSearchError when no row returned by db query', async () => {
      queryMock = jest.fn().mockReturnValue(
        Promise.resolve([])
      )
      dbConnectionMock = {
        query: queryMock
      }
      services = new Services({
        config,
        logger: loggerMock,
        dbConnection: dbConnectionMock
      })
      await expect(
        services.getByUserIdAndId(SERVICE.userId, SERVICE.id)
      ).rejects.toThrow(ResourceSearchError)
    })
  })

  describe('create', () => {
    it('calls db query with correct params', async () => {
      await services.create({
        userId: SERVICE.userId,
        name: SERVICE.name,
        endpoint: SERVICE.endpoint,
        description: SERVICE.description
      })
      expect(queryMock).toBeCalledWith(expect.anything(), [
        SERVICE.userId, SERVICE.name, SERVICE.endpoint, SERVICE.description
      ])
    })

    it('calls getByUserIdAndId with userId and returned id', async () => {
      services.getByUserIdAndId = jest.fn().mockReturnValue(
        Promise.resolve(SERVICE)
      )
      await services.create({
        userId: SERVICE.userId,
        name: SERVICE.name,
        endpoint: SERVICE.endpoint,
        description: SERVICE.description
      })
      expect(services.getByUserIdAndId).toBeCalledWith(SERVICE.userId, SERVICE.id)
    })

    it('returns value returned by getByUserIdAndId', async () => {
      services.getByUserIdAndId = jest.fn().mockReturnValue(
        Promise.resolve(SERVICE)
      )
      const res = await services.create({
        userId: SERVICE.userId,
        name: SERVICE.name,
        endpoint: SERVICE.endpoint,
        description: SERVICE.description
      })
      expect(res).toStrictEqual(SERVICE)
    })

    it('throws ResourceWriteError when no row returned by db query', async () => {
      queryMock = jest.fn().mockReturnValue(
        Promise.resolve([])
      )
      dbConnectionMock = {
        query: queryMock
      }
      services = new Services({
        config,
        logger: loggerMock,
        dbConnection: dbConnectionMock
      })
      await expect(
        services.create({
          userId: SERVICE.userId,
          name: SERVICE.name,
          endpoint: SERVICE.endpoint,
          description: SERVICE.description
        })
      ).rejects.toThrow(ResourceWriteError)
    })
  })
})
