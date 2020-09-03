import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('fabrics', tbl => {
        tbl.increments('id').primary()

        tbl.integer('provider_id')
            .references('providers.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        tbl.string('name').notNullable()
        tbl.decimal('grammage', 5, 3)
        tbl.decimal('price').notNullable()
        tbl.decimal('final_price').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('fabrics')
}