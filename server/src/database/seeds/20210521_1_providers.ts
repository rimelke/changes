import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('providers').insert([
        {
            "id": 1,
           "name":"Makro",
           "tax":"14"
        },
        {
            "id": 2,
           "name":"Aradefe",
           "tax":"6"
        },
        {
            "id": 3,
           "name":"Pettenati",
           "tax":"0"
        },
        {
            "id": 4,
           "name":"Rovitex",
           "tax":"14"
        }
    ])
}