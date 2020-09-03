import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('costs', tbl => {
        tbl.integer('product_id')
            .references('products.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        tbl.string('name').notNullable()
        tbl.decimal('value').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('costs')
}