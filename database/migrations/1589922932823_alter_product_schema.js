'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterProductSchema extends Schema {
  up() {
    this.table('products', (table) => {
      table.string('acompanhamento').defaultTo("")
    })
  }

  down() {
    this.table('alter_products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AlterProductSchema
