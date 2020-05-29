'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterProductSchema extends Schema {
  up() {
    this.table('products', (table) => {
      table.dropColumn('preco');
      table.float('price', [8], [2])
    })
  }

  down() {
    this.table('products', (table) => {
      table.dropColumn('preco');
      table.float('price', [8], [2])
    })
  }
}

module.exports = AlterProductSchema
