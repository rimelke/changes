import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('product_fabrics').insert([
        {
            "id": 1,
            "product_id": 20,
            "fabric_id": 31,
            "efficiency": 0.426,
            "final_price": 55.01,
            "subtotal": 23.43
        },
        {
            "id": 2,
            "product_id": 19,
            "fabric_id": 26,
            "efficiency": 0.4,
            "final_price": 42.9,
            "subtotal": 17.16
        },
        {
            "id": 3,
            "product_id": 17,
            "fabric_id": 1,
            "efficiency": 1.5,
            "final_price": 40.96,
            "subtotal": 61.44
        },
        {
            "id": 4,
            "product_id": 16,
            "fabric_id": 2,
            "efficiency": 0.58,
            "final_price": 37.59,
            "subtotal": 21.8
        },
        {
            "id": 5,
            "product_id": 16,
            "fabric_id": 3,
            "efficiency": 0.05,
            "final_price": 42.83,
            "subtotal": 2.14
        },
        {
            "id": 6,
            "product_id": 9,
            "fabric_id": 7,
            "efficiency": 0.54,
            "final_price": 91.09,
            "subtotal": 49.19
        },
        {
            "id": 7,
            "product_id": 25,
            "fabric_id": 5,
            "efficiency": 0.378,
            "final_price": 59.9,
            "subtotal": 22.64
        },
        {
            "id": 8,
            "product_id": 29,
            "fabric_id": 2,
            "efficiency": 0.55,
            "final_price": 37.59,
            "subtotal": 20.67
        },
        {
            "id": 9,
            "product_id": 29,
            "fabric_id": 3,
            "efficiency": 0.048,
            "final_price": 42.83,
            "subtotal": 2.06
        },
        {
            "id": 10,
            "product_id": 34,
            "fabric_id": 2,
            "efficiency": 0.6,
            "final_price": 37.59,
            "subtotal": 22.55
        },
        {
            "id": 11,
            "product_id": 34,
            "fabric_id": 3,
            "efficiency": 0.125,
            "final_price": 42.83,
            "subtotal": 5.35
        },
        {
            "id": 12,
            "product_id": 35,
            "fabric_id": 4,
            "efficiency": 0.382,
            "final_price": 42.9,
            "subtotal": 16.39
        },
        {
            "id": 13,
            "product_id": 37,
            "fabric_id": 8,
            "efficiency": 0.87,
            "final_price": 14.71,
            "subtotal": 12.79
        },
        {
            "id": 14,
            "product_id": 38,
            "fabric_id": 10,
            "efficiency": 0.33,
            "final_price": 39.9,
            "subtotal": 13.17
        },
        {
            "id": 15,
            "product_id": 39,
            "fabric_id": 9,
            "efficiency": 0.35,
            "final_price": 60,
            "subtotal": 21
        },
        {
            "id": 16,
            "product_id": 40,
            "fabric_id": 10,
            "efficiency": 0.35,
            "final_price": 39.9,
            "subtotal": 13.96
        },
        {
            "id": 17,
            "product_id": 41,
            "fabric_id": 10,
            "efficiency": 0.2,
            "final_price": 39.9,
            "subtotal": 7.98
        },
        {
            "id": 18,
            "product_id": 42,
            "fabric_id": 10,
            "efficiency": 0.21,
            "final_price": 39.9,
            "subtotal": 8.38
        },
        {
            "id": 19,
            "product_id": 43,
            "fabric_id": 10,
            "efficiency": 0.34,
            "final_price": 39.9,
            "subtotal": 13.57
        },
        {
            "id": 20,
            "product_id": 44,
            "fabric_id": 10,
            "efficiency": 0.35,
            "final_price": 39.9,
            "subtotal": 13.96
        },
        {
            "id": 21,
            "product_id": 45,
            "fabric_id": 12,
            "efficiency": 0.26,
            "final_price": 53.95,
            "subtotal": 14.03
        },
        {
            "id": 22,
            "product_id": 46,
            "fabric_id": 10,
            "efficiency": 0.42,
            "final_price": 39.9,
            "subtotal": 16.76
        },
        {
            "id": 23,
            "product_id": 47,
            "fabric_id": 13,
            "efficiency": 0.39,
            "final_price": 47.77,
            "subtotal": 18.63
        },
        {
            "id": 24,
            "product_id": 48,
            "fabric_id": 9,
            "efficiency": 0.42,
            "final_price": 60,
            "subtotal": 25.2
        },
        {
            "id": 25,
            "product_id": 49,
            "fabric_id": 11,
            "efficiency": 0.35,
            "final_price": 53.9,
            "subtotal": 18.86
        },
        {
            "id": 26,
            "product_id": 50,
            "fabric_id": 14,
            "efficiency": 0.195,
            "final_price": 51.57,
            "subtotal": 10.06
        },
        {
            "id": 27,
            "product_id": 51,
            "fabric_id": 14,
            "efficiency": 0.16,
            "final_price": 51.57,
            "subtotal": 8.25
        },
        {
            "id": 28,
            "product_id": 52,
            "fabric_id": 10,
            "efficiency": 0.21,
            "final_price": 39.9,
            "subtotal": 8.38
        },
        {
            "id": 29,
            "product_id": 53,
            "fabric_id": 14,
            "efficiency": 0.16,
            "final_price": 51.57,
            "subtotal": 8.25
        },
        {
            "id": 30,
            "product_id": 54,
            "fabric_id": 10,
            "efficiency": 0.5,
            "final_price": 39.9,
            "subtotal": 19.95
        },
        {
            "id": 31,
            "product_id": 55,
            "fabric_id": 10,
            "efficiency": 0.36,
            "final_price": 39.9,
            "subtotal": 14.36
        },
        {
            "id": 32,
            "product_id": 56,
            "fabric_id": 9,
            "efficiency": 0.36,
            "final_price": 60,
            "subtotal": 21.6
        },
        {
            "id": 33,
            "product_id": 57,
            "fabric_id": 15,
            "efficiency": 1.25,
            "final_price": 18.27,
            "subtotal": 22.84
        },
        {
            "id": 34,
            "product_id": 58,
            "fabric_id": 10,
            "efficiency": 0.265,
            "final_price": 39.9,
            "subtotal": 10.57
        },
        {
            "id": 35,
            "product_id": 59,
            "fabric_id": 10,
            "efficiency": 0.28,
            "final_price": 39.9,
            "subtotal": 11.17
        },
        {
            "id": 36,
            "product_id": 60,
            "fabric_id": 10,
            "efficiency": 0.125,
            "final_price": 39.9,
            "subtotal": 4.99
        },
        {
            "id": 37,
            "product_id": 60,
            "fabric_id": 16,
            "efficiency": 0.47,
            "final_price": 25.42,
            "subtotal": 11.95
        },
        {
            "id": 38,
            "product_id": 61,
            "fabric_id": 17,
            "efficiency": 0.106,
            "final_price": 73.59,
            "subtotal": 7.8
        },
        {
            "id": 39,
            "product_id": 62,
            "fabric_id": 10,
            "efficiency": 0.165,
            "final_price": 39.9,
            "subtotal": 6.58
        },
        {
            "id": 40,
            "product_id": 69,
            "fabric_id": 10,
            "efficiency": 0.255,
            "final_price": 39.9,
            "subtotal": 10.17
        },
        {
            "id": 41,
            "product_id": 70,
            "fabric_id": 9,
            "efficiency": 0.255,
            "final_price": 60,
            "subtotal": 15.3
        },
        {
            "id": 42,
            "product_id": 71,
            "fabric_id": 10,
            "efficiency": 0.255,
            "final_price": 39.9,
            "subtotal": 10.17
        },
        {
            "id": 43,
            "product_id": 72,
            "fabric_id": 10,
            "efficiency": 0.22,
            "final_price": 39.9,
            "subtotal": 8.78
        },
        {
            "id": 44,
            "product_id": 73,
            "fabric_id": 18,
            "efficiency": 0.2,
            "final_price": 63,
            "subtotal": 12.6
        },
        {
            "id": 45,
            "product_id": 74,
            "fabric_id": 20,
            "efficiency": 0.26,
            "final_price": 63,
            "subtotal": 16.38
        },
        {
            "id": 46,
            "product_id": 76,
            "fabric_id": 18,
            "efficiency": 0.29,
            "final_price": 63,
            "subtotal": 18.27
        },
        {
            "id": 47,
            "product_id": 77,
            "fabric_id": 10,
            "efficiency": 0.29,
            "final_price": 39.9,
            "subtotal": 11.57
        },
        {
            "id": 48,
            "product_id": 78,
            "fabric_id": 10,
            "efficiency": 0.45,
            "final_price": 39.9,
            "subtotal": 17.95
        },
        {
            "id": 49,
            "product_id": 79,
            "fabric_id": 21,
            "efficiency": 0.287,
            "final_price": 50.77,
            "subtotal": 14.57
        },
        {
            "id": 50,
            "product_id": 80,
            "fabric_id": 21,
            "efficiency": 0.242,
            "final_price": 50.77,
            "subtotal": 12.29
        },
        {
            "id": 51,
            "product_id": 81,
            "fabric_id": 22,
            "efficiency": 0.34,
            "final_price": 42.07,
            "subtotal": 14.3
        },
        {
            "id": 52,
            "product_id": 82,
            "fabric_id": 12,
            "efficiency": 0.415,
            "final_price": 53.95,
            "subtotal": 22.39
        },
        {
            "id": 53,
            "product_id": 82,
            "fabric_id": 23,
            "efficiency": 0.066,
            "final_price": 67.9,
            "subtotal": 4.48
        },
        {
            "id": 54,
            "product_id": 82,
            "fabric_id": 10,
            "efficiency": 0.056,
            "final_price": 39.9,
            "subtotal": 2.23
        },
        {
            "id": 55,
            "product_id": 84,
            "fabric_id": 7,
            "efficiency": 0.49,
            "final_price": 91.09,
            "subtotal": 44.63
        },
        {
            "id": 56,
            "product_id": 85,
            "fabric_id": 7,
            "efficiency": 0.54,
            "final_price": 91.09,
            "subtotal": 49.19
        },
        {
            "id": 57,
            "product_id": 86,
            "fabric_id": 12,
            "efficiency": 0.36,
            "final_price": 53.95,
            "subtotal": 19.42
        },
        {
            "id": 58,
            "product_id": 86,
            "fabric_id": 23,
            "efficiency": 0.06,
            "final_price": 67.9,
            "subtotal": 4.07
        },
        {
            "id": 59,
            "product_id": 87,
            "fabric_id": 2,
            "efficiency": 0.505,
            "final_price": 37.59,
            "subtotal": 18.98
        },
        {
            "id": 60,
            "product_id": 87,
            "fabric_id": 3,
            "efficiency": 0.086,
            "final_price": 42.83,
            "subtotal": 3.68
        },
        {
            "id": 61,
            "product_id": 88,
            "fabric_id": 2,
            "efficiency": 0.51,
            "final_price": 37.59,
            "subtotal": 19.17
        },
        {
            "id": 62,
            "product_id": 88,
            "fabric_id": 3,
            "efficiency": 0.048,
            "final_price": 42.83,
            "subtotal": 2.06
        },
        {
            "id": 63,
            "product_id": 89,
            "fabric_id": 2,
            "efficiency": 0.55,
            "final_price": 37.59,
            "subtotal": 20.67
        },
        {
            "id": 64,
            "product_id": 89,
            "fabric_id": 3,
            "efficiency": 0.048,
            "final_price": 42.83,
            "subtotal": 2.06
        },
        {
            "id": 65,
            "product_id": 90,
            "fabric_id": 2,
            "efficiency": 0.655,
            "final_price": 37.59,
            "subtotal": 24.62
        },
        {
            "id": 66,
            "product_id": 91,
            "fabric_id": 21,
            "efficiency": 0.245,
            "final_price": 50.77,
            "subtotal": 12.44
        },
        {
            "id": 67,
            "product_id": 92,
            "fabric_id": 24,
            "efficiency": 0.961,
            "final_price": 42.29,
            "subtotal": 40.64
        },
        {
            "id": 68,
            "product_id": 93,
            "fabric_id": 11,
            "efficiency": 0.441,
            "final_price": 53.9,
            "subtotal": 23.77
        },
        {
            "id": 69,
            "product_id": 94,
            "fabric_id": 25,
            "efficiency": 0.795,
            "final_price": 49.71,
            "subtotal": 39.52
        },
        {
            "id": 70,
            "product_id": 95,
            "fabric_id": 26,
            "efficiency": 0.397,
            "final_price": 42.9,
            "subtotal": 17.03
        },
        {
            "id": 71,
            "product_id": 95,
            "fabric_id": 24,
            "efficiency": 0.467,
            "final_price": 42.29,
            "subtotal": 19.75
        },
        {
            "id": 72,
            "product_id": 96,
            "fabric_id": 27,
            "efficiency": 0.54,
            "final_price": 57.9,
            "subtotal": 31.27
        },
        {
            "id": 73,
            "product_id": 97,
            "fabric_id": 28,
            "efficiency": 0.281,
            "final_price": 79.9,
            "subtotal": 22.45
        },
        {
            "id": 74,
            "product_id": 98,
            "fabric_id": 12,
            "efficiency": 0.36,
            "final_price": 53.95,
            "subtotal": 19.42
        },
        {
            "id": 75,
            "product_id": 98,
            "fabric_id": 12,
            "efficiency": 0.085,
            "final_price": 53.95,
            "subtotal": 4.59
        },
        {
            "id": 76,
            "product_id": 98,
            "fabric_id": 23,
            "efficiency": 0.07,
            "final_price": 67.9,
            "subtotal": 4.75
        },
        {
            "id": 77,
            "product_id": 98,
            "fabric_id": 10,
            "efficiency": 0.07,
            "final_price": 39.9,
            "subtotal": 2.79
        },
        {
            "id": 78,
            "product_id": 99,
            "fabric_id": 2,
            "efficiency": 0.66,
            "final_price": 37.59,
            "subtotal": 24.81
        },
        {
            "id": 79,
            "product_id": 99,
            "fabric_id": 29,
            "efficiency": 0.055,
            "final_price": 69.9,
            "subtotal": 3.84
        },
        {
            "id": 80,
            "product_id": 99,
            "fabric_id": 3,
            "efficiency": 0.113,
            "final_price": 42.83,
            "subtotal": 4.84
        },
        {
            "id": 81,
            "product_id": 100,
            "fabric_id": 2,
            "efficiency": 0.51,
            "final_price": 37.59,
            "subtotal": 19.17
        },
        {
            "id": 82,
            "product_id": 100,
            "fabric_id": 3,
            "efficiency": 0.145,
            "final_price": 42.83,
            "subtotal": 6.21
        },
        {
            "id": 83,
            "product_id": 101,
            "fabric_id": 2,
            "efficiency": 0.45,
            "final_price": 37.59,
            "subtotal": 16.91
        },
        {
            "id": 84,
            "product_id": 101,
            "fabric_id": 3,
            "efficiency": 0.145,
            "final_price": 42.83,
            "subtotal": 6.21
        },
        {
            "id": 85,
            "product_id": 102,
            "fabric_id": 2,
            "efficiency": 0.67,
            "final_price": 37.59,
            "subtotal": 25.18
        },
        {
            "id": 86,
            "product_id": 102,
            "fabric_id": 29,
            "efficiency": 0.055,
            "final_price": 69.9,
            "subtotal": 3.84
        },
        {
            "id": 87,
            "product_id": 102,
            "fabric_id": 3,
            "efficiency": 0.12,
            "final_price": 42.83,
            "subtotal": 5.14
        },
        {
            "id": 88,
            "product_id": 103,
            "fabric_id": 2,
            "efficiency": 0.72,
            "final_price": 37.59,
            "subtotal": 27.06
        },
        {
            "id": 89,
            "product_id": 103,
            "fabric_id": 29,
            "efficiency": 0.055,
            "final_price": 69.9,
            "subtotal": 3.84
        },
        {
            "id": 90,
            "product_id": 103,
            "fabric_id": 3,
            "efficiency": 0.12,
            "final_price": 42.83,
            "subtotal": 5.14
        },
        {
            "id": 91,
            "product_id": 104,
            "fabric_id": 26,
            "efficiency": 0.39,
            "final_price": 42.9,
            "subtotal": 16.73
        },
        {
            "id": 92,
            "product_id": 104,
            "fabric_id": 26,
            "efficiency": 0.125,
            "final_price": 42.9,
            "subtotal": 5.36
        },
        {
            "id": 93,
            "product_id": 105,
            "fabric_id": 30,
            "efficiency": 0.455,
            "final_price": 47.9,
            "subtotal": 21.79
        },
        {
            "id": 94,
            "product_id": 105,
            "fabric_id": 7,
            "efficiency": 0.03,
            "final_price": 91.09,
            "subtotal": 2.73
        },
        {
            "id": 95,
            "product_id": 105,
            "fabric_id": 3,
            "efficiency": 0.05,
            "final_price": 42.83,
            "subtotal": 2.14
        },
        {
            "id": 96,
            "product_id": 106,
            "fabric_id": 4,
            "efficiency": 0.49,
            "final_price": 42.9,
            "subtotal": 21.02
        },
        {
            "id": 97,
            "product_id": 106,
            "fabric_id": 10,
            "efficiency": 0.055,
            "final_price": 39.9,
            "subtotal": 2.19
        },
        {
            "id": 98,
            "product_id": 107,
            "fabric_id": 33,
            "efficiency": 0.593,
            "final_price": 52.9,
            "subtotal": 31.37
        },
        {
            "id": 99,
            "product_id": 108,
            "fabric_id": 34,
            "efficiency": 0.253,
            "final_price": 49.71,
            "subtotal": 12.58
        },
        {
            "id": 100,
            "product_id": 109,
            "fabric_id": 34,
            "efficiency": 0.285,
            "final_price": 49.71,
            "subtotal": 14.17
        },
        {
            "id": 101,
            "product_id": 110,
            "fabric_id": 12,
            "efficiency": 0.399,
            "final_price": 53.95,
            "subtotal": 21.53
        },
        {
            "id": 102,
            "product_id": 111,
            "fabric_id": 4,
            "efficiency": 0.49,
            "final_price": 42.9,
            "subtotal": 21.02
        },
        {
            "id": 103,
            "product_id": 111,
            "fabric_id": 10,
            "efficiency": 0.055,
            "final_price": 39.9,
            "subtotal": 2.19
        },
        {
            "id": 104,
            "product_id": 112,
            "fabric_id": 2,
            "efficiency": 0.92,
            "final_price": 37.59,
            "subtotal": 34.58
        },
        {
            "id": 105,
            "product_id": 112,
            "fabric_id": 29,
            "efficiency": 0.075,
            "final_price": 69.9,
            "subtotal": 5.24
        },
        {
            "id": 106,
            "product_id": 112,
            "fabric_id": 3,
            "efficiency": 0.16,
            "final_price": 42.83,
            "subtotal": 6.85
        },
        {
            "id": 107,
            "product_id": 113,
            "fabric_id": 22,
            "efficiency": 0.41,
            "final_price": 42.07,
            "subtotal": 17.25
        },
        {
            "id": 108,
            "product_id": 114,
            "fabric_id": 21,
            "efficiency": 0.285,
            "final_price": 50.77,
            "subtotal": 14.47
        },
        {
            "id": 109,
            "product_id": 115,
            "fabric_id": 21,
            "efficiency": 0.19,
            "final_price": 50.77,
            "subtotal": 9.65
        }
    ])
}