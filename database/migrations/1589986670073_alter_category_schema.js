'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterCategorySchema extends Schema {
  up() {
    this.table('categories', (table) => {
      table.string('image_default_product').defaultTo("")
    })
  }

  down() {
    this.table('alter_categories', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AlterCategorySchema
