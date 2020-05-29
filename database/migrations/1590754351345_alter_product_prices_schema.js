'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterProductPricesSchema extends Schema {
  up() {
    this.table('product_sizes', (table) => {
      table.dropColumn('preco');
      table.float('price', [8], [2])
    })
  }

  down() {
    this.table('product_sizes', (table) => {
      table.dropColumn('preco');
      table.float('price', [8], [2])
    })
  }
}

module.exports = AlterProductPricesSchema
