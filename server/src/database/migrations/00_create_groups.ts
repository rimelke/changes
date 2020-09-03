import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('groups', tbl => {
        tbl.increments('id').primary()

        tbl.string('name')
            .unique()
            .notNullable()
        tbl.decimal('cost_avg')
        tbl.decimal('price_avg')
        tbl.decimal('profit_avg')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('groups')
}