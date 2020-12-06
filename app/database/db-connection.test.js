const DbConnection = require('./db-connection')
const { DatabaseError } = require('../errors')

const config = {
  DB_CNXN_STRING: 'TEST_DB_CNXN_STRING'
}
let loggerMock
let queryMock
let poolMock

describe('DbConnection', () => {
  beforeEach(() => {
    loggerMock = {
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn()
    }
    queryMock = jest.fn().mockReturnValue(
      Promise.resolve({ rows: [] })
    )
    poolMock = {
      query: queryMock
    }
  })

  it('calls query method of pool object with correct arguments', async () => {
    const conn = new DbConnection({
      config,
      logger: loggerMock,
      pool: poolMock
    })
    await conn.query('select $1::text, $2::bool', ['foobar', true])
    expect(queryMock).toBeCalledWith('select $1::text, $2::bool', ['foobar', true])
  })

  it('returns rows from the query result', async () => {
    const ROWS = [
      { id: 'id1', name: 'name1' },
      { id: 'id2', name: 'name2' }
    ]
    queryMock = jest.fn().mockReturnValue(
      Promise.resolve({ rows: ROWS })
    )
    poolMock = {
      query: queryMock
    }
    const conn = new DbConnection({
      config,
      logger: loggerMock,
      pool: poolMock
    })
    const rows = await conn.query('select * from a_table')
    expect(rows).toStrictEqual(ROWS)
  })

  it('converts keys from snakecase to camelCase for returned rows from the query result', async () => {
    const ROWS = [
      { id: 'id1', some_key_name: 'name1', another_key: 'another_name1' },
      { id: 'id2', some_key_name: 'name2', another_key: 'another_name2' }
    ]
    queryMock = jest.fn().mockReturnValue(
      Promise.resolve({ rows: ROWS })
    )
    poolMock = {
      query: queryMock
    }
    const conn = new DbConnection({
      config,
      logger: loggerMock,
      pool: poolMock
    })
    const rows = await conn.query('select * from a_table')
    expect(rows).toStrictEqual([
      { id: 'id1', someKeyName: 'name1', anotherKey: 'another_name1' },
      { id: 'id2', someKeyName: 'name2', anotherKey: 'another_name2' }
    ])
  })

  it('throws DatabaseError in case of errors', async () => {
    const error = new Error('Some DB error')
    queryMock = jest.fn().mockReturnValue(
      Promise.reject(error)
    )
    poolMock = {
      query: queryMock
    }
    const conn = new DbConnection({
      config,
      logger: loggerMock,
      pool: poolMock
    })
    await expect(conn.query('select true')).rejects.toThrow(DatabaseError)
  })

  it('_toCamelCase converts snake_case array of objects to camelCase', () => {
    const LIST = [
      { key: 'value1', some_key: 'value2', some_other_key: 'value3' },
      { key: 'value4', some_key: 'value5', some_other_key: 'value6' }
    ]
    const conn = new DbConnection({
      config,
      logger: loggerMock,
      pool: poolMock
    })
    expect(conn._toCamelCase(LIST)).toStrictEqual([
      { key: 'value1', someKey: 'value2', someOtherKey: 'value3' },
      { key: 'value4', someKey: 'value5', someOtherKey: 'value6' }
    ])
  })
})
