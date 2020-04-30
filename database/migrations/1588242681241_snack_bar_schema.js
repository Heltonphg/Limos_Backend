'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SnackBarSchema extends Schema {
  up() {
    this.create('snack_bars', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('image_back')
      table.string('logo').defaultTo('https://logo.criativoon.com/wp-content/uploads/2016/07/logotipo-lanchonete.png')
      table.string('min_max_time_delivery')
      table.float('geral_avaliation', [8], [2])
      table.string('payment')
      table.timestamps()
    })
  }

  down() {
    this.drop('snack_bars')
  }
}

module.exports = SnackBarSchema
