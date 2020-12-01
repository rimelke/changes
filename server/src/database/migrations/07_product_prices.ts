import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('product_prices', tbl => {
        tbl.integer('product_id')
            .references('products.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        tbl.integer('price_id')
            .references('prices.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable()

        tbl.decimal('value').notNullable()
        tbl.dateTime('profit').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('product_prices')
}