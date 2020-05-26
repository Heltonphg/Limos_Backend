'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BagSchema extends Schema {
  up() {
    this.create('bags', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('snack_bar_id')
        .unsigned()
        .references('id')
        .inTable('snack_bars')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .notNullable()
      table.string('size')
      table.integer('quantity').notNullable().defaultTo(1)
      table.float('preco', [8], [2]).notNullable()
      table.float('preco_original', [8], [2]).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('bags')
  }
}

module.exports = BagSchema
