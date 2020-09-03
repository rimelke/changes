import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('products', tbl => {
        tbl.increments('id').primary()

        tbl.string('ref').unique().notNullable()
        tbl.integer('group_id')
            .references('groups.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        tbl.string('name').notNullable()
        tbl.decimal('cost')
        tbl.decimal('price')
        tbl.decimal('profit')
        tbl.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        tbl.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('products')
}