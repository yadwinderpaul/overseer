/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTrigger('services', 'tg_services_update', {
    when: 'BEFORE',
    operation: 'UPDATE',
    level: 'ROW',
    language: 'plpgsql',
    replace: true
  }, `BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;`)
}

exports.down = pgm => {
  pgm.dropTrigger('services', 'tg_services_update', {
    ifExists: true,
    cascade: true
  })
}
