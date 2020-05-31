"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductSizeSchema extends Schema {
  up() {
    this.create("product_sizes", (table) => {
      table.increments();
      table.boolean("is_active").defaultTo(true);
      table.string("size").notNullable();
      table.float("price", [8], [2]);
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("product_sizes");
  }
}

module.exports = ProductSizeSchema;
