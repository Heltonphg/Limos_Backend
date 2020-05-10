'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SnackAddressSchema extends Schema {
  up() {
    this.create('snack_addresses', (table) => {
      table.increments()
      table.string('zipe_code', 45).notNullable()
      table.string('city', 144).notNullable()
      table.string('state', 10).notNullable()
      table.string('phone', 15)
      table.string('latitude')
      table.string('longitude')
      table.timestamps()
    })
  }

  down() {
    this.drop('snack_addresses')
  }
}

module.exports = SnackAddressSchema
