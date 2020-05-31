"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlterSnackAddPasswordAndClosedSchema extends Schema {
  up() {
    this.table("snack_bars", (table) => {
      table.string("password", 60);
      table.boolean("is_open").defaultTo(false);
    });
  }

  down() {
    this.table("snack_bars", (table) => {
      table.string("password", 60);
      table.boolean("is_open").defaultTo(false);
    });
  }
}

module.exports = AlterSnackAddPasswordAndClosedSchema;
