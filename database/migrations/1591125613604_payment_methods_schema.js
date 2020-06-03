"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PaymentMethodsSchema extends Schema {
  up() {
    this.create("payment_methods", (table) => {
      table.increments();
      table.string("type");
      table.string("name_flag");
      table.string("image_flag").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("payment_methods");
  }
}

module.exports = PaymentMethodsSchema;
