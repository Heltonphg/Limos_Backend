'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments()
      table.string('name')
      table.float('preco', [8], [2])
      table.string('description')
      table.string('time_preparation')
      table.float('avaliation', [8], [2])
      table.string('image')
      table.integer('snack_bar_id')
        .unsigned()
        .references('id')
        .inTable('snack_bars')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductSchema
