import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('product_fabrics', tbl => {
        tbl.integer('product_id')
            .references('products.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        tbl.integer('fabric_id')
            .references('fabrics.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable()

        tbl.decimal('efficiency', 5, 3).notNullable()
        tbl.decimal('final_price').notNullable()
        tbl.decimal('subtotal').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('product_fabrics')
}