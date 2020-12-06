/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      notNull: true,
      default: pgm.func('uuid_generate_v1mc()'),
      primaryKey: true
    },
    name: {
      type: 'text',
      notNull: true
    },
    email: {
      type: 'citext',
      notNull: true,
      unique: true
    },
    passhash: {
      type: 'text',
      notNull: true
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.createIndex('users', 'email')
}

exports.down = pgm => {
  pgm.dropTable('users')
}
