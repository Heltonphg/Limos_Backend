'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterProductSchema extends Schema {
  up() {
    this.alter('products', (table) => {
      table.boolean('is_empty').notNullable().defaultTo(true)
    })
  }

  down() {
    this.alter('products', (table) => {
      table.boolean('is_empty').notNullable().defaultTo(true)
    })
  }
}

module.exports = AlterProductSchema
