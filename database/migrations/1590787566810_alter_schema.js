'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterSchema extends Schema {
  up() {
    this.alter('products', (t) => {
      t.float('avaliation', [8], [2]).defaultTo(0).alter()
    })
  }

  down() {
    this.alter('products', (t) => {
      t.float('avaliation', [8], [2]).defaultTo(0).alter()
    })
  }
}

module.exports = AlterSchema
