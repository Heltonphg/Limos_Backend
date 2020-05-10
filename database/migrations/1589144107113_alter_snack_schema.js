'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterSnackSchema extends Schema {
  up() {
    this.alter('snack_bars', (table) => {
      table.integer('snack_address_id')
        .unsigned()
        .references('id')
        .inTable('snack_addresses')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }
  down() {
    this.alter('snack_bars', (table) => {
      table.integer('snack_address_id')
        .unsigned()
        .references('id')
        .inTable('snack_addresses')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }
}

module.exports = AlterSnackSchema
