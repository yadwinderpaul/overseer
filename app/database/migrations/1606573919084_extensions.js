/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createExtension('uuid-ossp', {
    ifNotExists: true
  })
  pgm.createExtension('citext', {
    ifNotExists: true
  })
}

exports.down = pgm => {
  pgm.dropExtension('uuid-ossp', {
    ifExists: true
  })
  pgm.dropExtension('citext', {
    ifExists: true
  })
}
