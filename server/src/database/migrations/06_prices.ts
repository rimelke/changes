import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('prices', tbl => {
        tbl.increments('id').notNullable()
        tbl.boolean('default').defaultTo(false).notNullable()
        tbl.string('name').notNullable()
        tbl.decimal('expected').notNullable()
        tbl.decimal('profit')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('prices')
}