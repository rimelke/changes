import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('groups', tbl => {
        tbl.increments('id').primary()

        tbl.string('name')
            .unique()
            .notNullable()
        tbl.decimal('profit')
        tbl.decimal('desired').notNullable()
        tbl.decimal('minimum').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('groups')
}