/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('status_updates', {
    service_id: {
      type: 'uuid',
      notNull: true,
      references: '"services"'
    },
    status: {
      type: 'boolean',
      notNull: true
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.createIndex('status_updates', 'service_id')
  pgm.createIndex('status_updates', 'created_at')
}

exports.down = pgm => {
  pgm.dropTable('status_updates')
}
