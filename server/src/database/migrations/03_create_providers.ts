import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('providers', tbl => {
        tbl.increments('id').primary()

        tbl.string('name').unique().notNullable()
        tbl.decimal('tax').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('providers')
}