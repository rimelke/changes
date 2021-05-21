import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('fabrics').insert([
        {
            "id": 1,
            "provider_id": 1,
            "name": "Tricot com pelo",
            "grammage": 0,
            "width": 1.65,
            "price": 35.93,
            "final_price": 40.96
        },
        {
            "id": 2,
            "provider_id": 2,
            "name": "Moletom 3 cabos",
            "grammage": 320,
            "width": 1.75,
            "price": 35.46,
            "final_price": 37.59
        },
        {
            "id": 3,
            "provider_id": 2,
            "name": "Ribana",
            "grammage": 445,
            "width": 0.75,
            "price": 40.41,
            "final_price": 42.83
        },
        {
            "id": 4,
            "provider_id": 3,
            "name": "Thermoblock",
            "grammage": 250,
            "width": 1.65,
            "price": 42.9,
            "final_price": 42.9
        },
        {
            "id": 5,
            "provider_id": 3,
            "name": "suplex liso",
            "grammage": 355,
            "width": 1.58,
            "price": 59.9,
            "final_price": 59.9
        },
        {
            "id": 6,
            "provider_id": 3,
            "name": "suplex mescla especial",
            "grammage": 0,
            "width": 1.48,
            "price": 67.9,
            "final_price": 67.9
        },
        {
            "id": 7,
            "provider_id": 1,
            "name": "tec plush latter couro vegetal",
            "grammage": 350,
            "width": 1.4,
            "price": 79.9,
            "final_price": 91.09
        },
        {
            "id": 8,
            "provider_id": 1,
            "name": "BENGALINE PRETO",
            "grammage": 0,
            "width": 1.47,
            "price": 12.9,
            "final_price": 14.71
        },
        {
            "id": 9,
            "provider_id": 3,
            "name": "visco estampado",
            "grammage": 210,
            "width": 1.6,
            "price": 60,
            "final_price": 60
        },
        {
            "id": 10,
            "provider_id": 3,
            "name": "Visco liso",
            "grammage": 215,
            "width": 1.64,
            "price": 39.9,
            "final_price": 39.9
        },
        {
            "id": 11,
            "provider_id": 3,
            "name": "body fit",
            "grammage": 315,
            "width": 1.7,
            "price": 53.9,
            "final_price": 53.9
        },
        {
            "id": 12,
            "provider_id": 3,
            "name": "MOLETINHO liso",
            "grammage": 255,
            "width": 1.63,
            "price": 53.95,
            "final_price": 53.95
        },
        {
            "id": 13,
            "provider_id": 4,
            "name": "CREPE",
            "grammage": 0,
            "width": 0,
            "price": 41.9,
            "final_price": 47.77
        },
        {
            "id": 14,
            "provider_id": 3,
            "name": "Canelado Fino",
            "grammage": 202,
            "width": 1.44,
            "price": 51.57,
            "final_price": 51.57
        },
        {
            "id": 15,
            "provider_id": 1,
            "name": "Bengaline Jeans",
            "grammage": 0,
            "width": 1.47,
            "price": 16.03,
            "final_price": 18.27
        },
        {
            "id": 16,
            "provider_id": 1,
            "name": "Courino",
            "grammage": 0,
            "width": 1.4,
            "price": 22.3,
            "final_price": 25.42
        },
        {
            "id": 17,
            "provider_id": 1,
            "name": "Ultracool fit Poliamida",
            "grammage": 122,
            "width": 1.65,
            "price": 64.55,
            "final_price": 73.59
        },
        {
            "id": 18,
            "provider_id": 3,
            "name": "visco tye day",
            "grammage": 210,
            "width": 1.6,
            "price": 63,
            "final_price": 63
        },
        {
            "id": 19,
            "provider_id": 1,
            "name": "moleton 2 cabos apeluciado ",
            "grammage": 0,
            "width": 0,
            "price": 24.61,
            "final_price": 28.06
        },
        {
            "id": 20,
            "provider_id": 3,
            "name": "MOLETINHO TYE DAY",
            "grammage": 0,
            "width": 0,
            "price": 63,
            "final_price": 63
        },
        {
            "id": 21,
            "provider_id": 3,
            "name": "Thermo dry 2020",
            "grammage": 160,
            "width": 1.64,
            "price": 50.77,
            "final_price": 50.77
        },
        {
            "id": 22,
            "provider_id": 1,
            "name": "WINTER",
            "grammage": 225,
            "width": 1.5,
            "price": 36.9,
            "final_price": 42.07
        },
        {
            "id": 23,
            "provider_id": 3,
            "name": "RIBANA",
            "grammage": 261,
            "width": 99,
            "price": 67.9,
            "final_price": 67.9
        },
        {
            "id": 24,
            "provider_id": 3,
            "name": "Pelúcia",
            "grammage": 360,
            "width": 1.63,
            "price": 42.29,
            "final_price": 42.29
        },
        {
            "id": 25,
            "provider_id": 3,
            "name": "Sherpa 7239",
            "grammage": 342,
            "width": 1.76,
            "price": 49.71,
            "final_price": 49.71
        },
        {
            "id": 26,
            "provider_id": 3,
            "name": "Soft",
            "grammage": 180,
            "width": 1.67,
            "price": 42.9,
            "final_price": 42.9
        },
        {
            "id": 27,
            "provider_id": 3,
            "name": "matelasse lisos",
            "grammage": 293,
            "width": 1.6,
            "price": 57.9,
            "final_price": 57.9
        },
        {
            "id": 28,
            "provider_id": 3,
            "name": "mesh micro touch dry 2345",
            "grammage": 156,
            "width": 1.26,
            "price": 79.9,
            "final_price": 79.9
        },
        {
            "id": 29,
            "provider_id": 3,
            "name": "SILKY COTTON EGYPTIAN",
            "grammage": 150,
            "width": 1.75,
            "price": 69.9,
            "final_price": 69.9
        },
        {
            "id": 30,
            "provider_id": 3,
            "name": "Tweed ",
            "grammage": 280,
            "width": 1.73,
            "price": 47.9,
            "final_price": 47.9
        },
        {
            "id": 31,
            "provider_id": 3,
            "name": "Cirre apeluciado",
            "grammage": 245,
            "width": 1.61,
            "price": 55.01,
            "final_price": 55.01
        },
        {
            "id": 32,
            "provider_id": 1,
            "name": "unifloc",
            "grammage": 255,
            "width": 1.8,
            "price": 54.94,
            "final_price": 62.63
        },
        {
            "id": 33,
            "provider_id": 3,
            "name": "Matelasse jeans",
            "grammage": 338,
            "width": 1.63,
            "price": 52.9,
            "final_price": 52.9
        },
        {
            "id": 34,
            "provider_id": 3,
            "name": "Tricot max",
            "grammage": 190,
            "width": 1.7,
            "price": 49.71,
            "final_price": 49.71
        }
    ])
}