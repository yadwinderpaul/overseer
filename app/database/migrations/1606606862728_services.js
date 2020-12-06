/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('services', {
    id: {
      type: 'uuid',
      notNull: true,
      default: pgm.func('uuid_generate_v1mc()'),
      primaryKey: true
    },
    user_id: {
      type: 'uuid',
      notNull: true,
      references: '"users"'
    },
    name: {
      type: 'text',
      notNull: true,
      unique: true
    },
    endpoint: {
      type: 'text',
      notNull: true
    },
    description: {
      type: 'text'
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.createIndex('services', 'user_id')
}

exports.down = pgm => {
  pgm.dropTable('services')
}
