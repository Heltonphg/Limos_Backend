'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUsersSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table.integer('avatar_id')
        .unsigned()
        .references('id')
        .inTable('avatars')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = AlterUsersSchema
