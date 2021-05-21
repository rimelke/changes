import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('providers').insert([
        {
            "id": 1,
           "nome":"Makro",
           "tax":"14"
        },
        {
            "id": 2,
           "nome":"Aradefe",
           "tax":"6"
        },
        {
            "id": 3,
           "nome":"Pettenati",
           "tax":"0"
        },
        {
            "id": 4,
           "nome":"Rovitex",
           "tax":"14"
        }
    ])
}