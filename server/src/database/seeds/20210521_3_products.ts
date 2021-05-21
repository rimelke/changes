import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('products').insert([
        {
            "id": 1,
            "ref": "V450",
            "group_id": 1,
            "name": "",
            "cost": 39.9,
            "price": 74.9,
            "profit": 87.7
        },
        {
            "id": 2,
            "ref": "BLUSA TEXAS",
            "group_id": 1,
            "name": "",
            "cost": 32.44,
            "price": null,
            "profit": null
        },
        {
            "id": 3,
            "ref": "B452",
            "group_id": 1,
            "name": "",
            "cost": 12.56,
            "price": 24.9,
            "profit": 98.2
        },
        {
            "id": 4,
            "ref": "V448",
            "group_id": 1,
            "name": "",
            "cost": 35.83,
            "price": 69.9,
            "profit": 95.1
        },
        {
            "id": 5,
            "ref": "V468",
            "group_id": 1,
            "name": "",
            "cost": 34.8,
            "price": 69.9,
            "profit": 100.9
        },
        {
            "id": 6,
            "ref": "CS466",
            "group_id": 1,
            "name": "",
            "cost": 37.42,
            "price": 74.9,
            "profit": 100.2
        },
        {
            "id": 7,
            "ref": "CL471",
            "group_id": 1,
            "name": "",
            "cost": 43.17,
            "price": 84.9,
            "profit": 96.7
        },
        {
            "id": 8,
            "ref": "MT473",
            "group_id": 1,
            "name": "",
            "cost": 42.24,
            "price": 84.9,
            "profit": 101
        },
        {
            "id": 9,
            "ref": "CL474",
            "group_id": 1,
            "name": "",
            "cost": 68.67,
            "price": 129.9,
            "profit": 89.2
        },
        {
            "id": 10,
            "ref": "CL475",
            "group_id": 1,
            "name": "",
            "cost": 55.2,
            "price": 99.9,
            "profit": 81
        },
        {
            "id": 11,
            "ref": "CS476 PELE NA MANGA",
            "group_id": 1,
            "name": "",
            "cost": 70.03,
            "price": 139.9,
            "profit": 99.8
        },
        {
            "id": 12,
            "ref": "CS476",
            "group_id": 1,
            "name": "",
            "cost": 61.13,
            "price": 139.9,
            "profit": 128.9
        },
        {
            "id": 13,
            "ref": "V470 LISO",
            "group_id": 1,
            "name": "",
            "cost": 22.78,
            "price": 49.9,
            "profit": 119.1
        },
        {
            "id": 14,
            "ref": "B478",
            "group_id": 1,
            "name": "",
            "cost": 33.93,
            "price": 64.9,
            "profit": 91.3
        },
        {
            "id": 15,
            "ref": "CL469",
            "group_id": 1,
            "name": "",
            "cost": 31.01,
            "price": 64.9,
            "profit": 109.3
        },
        {
            "id": 16,
            "ref": "CL479",
            "group_id": 1,
            "name": "",
            "cost": 39.14,
            "price": 79.9,
            "profit": 104.1
        },
        {
            "id": 17,
            "ref": "CS488",
            "group_id": 1,
            "name": "",
            "cost": 84.42,
            "price": 169.9,
            "profit": 101.3
        },
        {
            "id": 18,
            "ref": "B465",
            "group_id": 1,
            "name": "",
            "cost": 15.5,
            "price": 31.9,
            "profit": 105.8
        },
        {
            "id": 19,
            "ref": "CS490",
            "group_id": 1,
            "name": "",
            "cost": 39.59,
            "price": 79.9,
            "profit": 101.8
        },
        {
            "id": 20,
            "ref": "CS492",
            "group_id": 1,
            "name": "",
            "cost": 40.71,
            "price": 79.9,
            "profit": 96.3
        },
        {
            "id": 21,
            "ref": "V470 ESTAMPADO",
            "group_id": 1,
            "name": "",
            "cost": 29.13,
            "price": 59.9,
            "profit": 105.6
        },
        {
            "id": 22,
            "ref": "B477 LISA",
            "group_id": 1,
            "name": "",
            "cost": 23.09,
            "price": 49.9,
            "profit": 116.1
        },
        {
            "id": 23,
            "ref": "B477 EST",
            "group_id": 1,
            "name": "",
            "cost": 31.6,
            "price": 59.9,
            "profit": 89.6
        },
        {
            "id": 24,
            "ref": "495",
            "group_id": 1,
            "name": "",
            "cost": 45.11,
            "price": 84.9,
            "profit": 88.2
        },
        {
            "id": 25,
            "ref": "LG01",
            "group_id": 1,
            "name": "",
            "cost": 29.42,
            "price": 59.9,
            "profit": 103.6
        },
        {
            "id": 26,
            "ref": "B104",
            "group_id": 1,
            "name": "",
            "cost": 14.65,
            "price": 29.9,
            "profit": 104.1
        },
        {
            "id": 27,
            "ref": "CL496 SINO",
            "group_id": 1,
            "name": "",
            "cost": 31.63,
            "price": 59.9,
            "profit": 89.4
        },
        {
            "id": 28,
            "ref": "497 BASICA DRY",
            "group_id": 1,
            "name": "",
            "cost": 14.42,
            "price": 29.9,
            "profit": 107.4
        },
        {
            "id": 29,
            "ref": "CL491",
            "group_id": 1,
            "name": "",
            "cost": 37.03,
            "price": 79.9,
            "profit": 115.8
        },
        {
            "id": 30,
            "ref": "LG494 LEGUE CIRRE",
            "group_id": 1,
            "name": "",
            "cost": 22.08,
            "price": 44.9,
            "profit": 103.4
        },
        {
            "id": 31,
            "ref": "LEGUE FLARE",
            "group_id": 1,
            "name": "",
            "cost": 22.08,
            "price": 44.9,
            "profit": 103.4
        },
        {
            "id": 32,
            "ref": "",
            "group_id": 1,
            "name": "",
            "cost": 0,
            "price": null,
            "profit": null
        },
        {
            "id": 33,
            "ref": "MT475",
            "group_id": 1,
            "name": "",
            "cost": 0,
            "price": null,
            "profit": null
        },
        {
            "id": 34,
            "ref": "MT45",
            "group_id": 1,
            "name": "",
            "cost": 41.5,
            "price": 74.9,
            "profit": 80.5
        },
        {
            "id": 35,
            "ref": "CL360",
            "group_id": 1,
            "name": "",
            "cost": 29.59,
            "price": 59.9,
            "profit": 102.4
        },
        {
            "id": 36,
            "ref": "DULLIUS",
            "group_id": 1,
            "name": "",
            "cost": 52.45,
            "price": 82,
            "profit": 56.3
        },
        {
            "id": 37,
            "ref": "DULLIUS BENGALINE PRETO",
            "group_id": 1,
            "name": "",
            "cost": 38.14,
            "price": 69.9,
            "profit": 83.3
        },
        {
            "id": 38,
            "ref": "CL507",
            "group_id": 1,
            "name": "",
            "cost": 25.77,
            "price": 49.9,
            "profit": 93.6
        },
        {
            "id": 39,
            "ref": "V504 E",
            "group_id": 1,
            "name": "",
            "cost": 37.1,
            "price": 74.9,
            "profit": 101.9
        },
        {
            "id": 40,
            "ref": "V504 L",
            "group_id": 1,
            "name": "",
            "cost": 30.060000000000002,
            "price": 59.9,
            "profit": 99.3
        },
        {
            "id": 41,
            "ref": "B505",
            "group_id": 1,
            "name": "",
            "cost": 13.58,
            "price": 24.9,
            "profit": 83.4
        },
        {
            "id": 42,
            "ref": "B506",
            "group_id": 1,
            "name": "",
            "cost": 14.98,
            "price": 29.9,
            "profit": 99.6
        },
        {
            "id": 43,
            "ref": "CL508",
            "group_id": 1,
            "name": "",
            "cost": 27.17,
            "price": 54.9,
            "profit": 102.1
        },
        {
            "id": 44,
            "ref": "V509",
            "group_id": 1,
            "name": "",
            "cost": 28.36,
            "price": 59.9,
            "profit": 111.2
        },
        {
            "id": 45,
            "ref": "BM510",
            "group_id": 1,
            "name": "",
            "cost": 27.63,
            "price": 49.9,
            "profit": 80.6
        },
        {
            "id": 46,
            "ref": "V511",
            "group_id": 1,
            "name": "",
            "cost": 30.160000000000004,
            "price": 59.9,
            "profit": 98.6
        },
        {
            "id": 47,
            "ref": "V512 CREPE",
            "group_id": 1,
            "name": "",
            "cost": 37.73,
            "price": 74.9,
            "profit": 98.5
        },
        {
            "id": 48,
            "ref": "V511 ESTAMPADO",
            "group_id": 1,
            "name": "",
            "cost": 38.6,
            "price": 74.9,
            "profit": 94
        },
        {
            "id": 49,
            "ref": "BM513",
            "group_id": 1,
            "name": "",
            "cost": 31.96,
            "price": 59.9,
            "profit": 87.4
        },
        {
            "id": 50,
            "ref": "B515",
            "group_id": 1,
            "name": "",
            "cost": 18.16,
            "price": 39.9,
            "profit": 119.7
        },
        {
            "id": 51,
            "ref": "B516",
            "group_id": 1,
            "name": "",
            "cost": 19.95,
            "price": 39.9,
            "profit": 100
        },
        {
            "id": 52,
            "ref": "B517",
            "group_id": 1,
            "name": "",
            "cost": 15.98,
            "price": 34.9,
            "profit": 118.4
        },
        {
            "id": 53,
            "ref": "B518",
            "group_id": 1,
            "name": "",
            "cost": 15.35,
            "price": 29.9,
            "profit": 94.8
        },
        {
            "id": 54,
            "ref": "MC519",
            "group_id": 1,
            "name": "",
            "cost": 35.55,
            "price": 69.9,
            "profit": 96.6
        },
        {
            "id": 55,
            "ref": "V520L",
            "group_id": 1,
            "name": "",
            "cost": 26.96,
            "price": 59.9,
            "profit": 122.2
        },
        {
            "id": 56,
            "ref": "V520E",
            "group_id": 1,
            "name": "",
            "cost": 34.2,
            "price": 69.9,
            "profit": 104.4
        },
        {
            "id": 57,
            "ref": "V521",
            "group_id": 1,
            "name": "",
            "cost": 39.94,
            "price": 74.9,
            "profit": 87.5
        },
        {
            "id": 58,
            "ref": "B522",
            "group_id": 1,
            "name": "",
            "cost": 18.67,
            "price": 37.9,
            "profit": 103
        },
        {
            "id": 59,
            "ref": "B523",
            "group_id": 1,
            "name": "",
            "cost": 20.77,
            "price": 39.9,
            "profit": 92.1
        },
        {
            "id": 60,
            "ref": "B524",
            "group_id": 1,
            "name": "",
            "cost": 26.54,
            "price": 49.9,
            "profit": 88
        },
        {
            "id": 61,
            "ref": "B525",
            "group_id": 1,
            "name": "",
            "cost": 15.9,
            "price": 31.9,
            "profit": 100.6
        },
        {
            "id": 62,
            "ref": "B526",
            "group_id": 1,
            "name": "",
            "cost": 13.68,
            "price": 29.9,
            "profit": 118.6
        },
        {
            "id": 63,
            "ref": "F527",
            "group_id": 1,
            "name": "",
            "cost": 43.92,
            "price": 84.9,
            "profit": 93.3
        },
        {
            "id": 64,
            "ref": "F528",
            "group_id": 1,
            "name": "",
            "cost": 43.92,
            "price": 84.9,
            "profit": 93.3
        },
        {
            "id": 65,
            "ref": "F529",
            "group_id": 1,
            "name": "",
            "cost": 37.07,
            "price": 74.9,
            "profit": 102.1
        },
        {
            "id": 66,
            "ref": "F530",
            "group_id": 1,
            "name": "",
            "cost": 43.77,
            "price": 84.9,
            "profit": 94
        },
        {
            "id": 67,
            "ref": "F531",
            "group_id": 1,
            "name": "",
            "cost": 43.67,
            "price": 84.9,
            "profit": 94.4
        },
        {
            "id": 68,
            "ref": "F532",
            "group_id": 1,
            "name": "",
            "cost": 39.27,
            "price": 74.9,
            "profit": 90.7
        },
        {
            "id": 69,
            "ref": "B430",
            "group_id": 1,
            "name": "",
            "cost": 19.27,
            "price": 37.9,
            "profit": 96.7
        },
        {
            "id": 70,
            "ref": "B430 ESTAMP",
            "group_id": 1,
            "name": "",
            "cost": 27.5,
            "price": 49.9,
            "profit": 81.5
        },
        {
            "id": 71,
            "ref": "B430 LISA",
            "group_id": 1,
            "name": "",
            "cost": 21.37,
            "price": 49.9,
            "profit": 133.5
        },
        {
            "id": 72,
            "ref": "B463 LISA",
            "group_id": 1,
            "name": "",
            "cost": 24.03,
            "price": 49.9,
            "profit": 107.7
        },
        {
            "id": 73,
            "ref": "B505 TIE DAY",
            "group_id": 1,
            "name": "",
            "cost": 18.2,
            "price": 34.9,
            "profit": 91.8
        },
        {
            "id": 74,
            "ref": "BM510 TAY DAY",
            "group_id": 1,
            "name": "",
            "cost": 29.98,
            "price": 59.9,
            "profit": 99.8
        },
        {
            "id": 75,
            "ref": "CJ533 TYE DAY",
            "group_id": 1,
            "name": "",
            "cost": 48.18,
            "price": 89.9,
            "profit": 86.6
        },
        {
            "id": 76,
            "ref": "V534  TAYDAY",
            "group_id": 1,
            "name": "",
            "cost": 26.87,
            "price": 49.9,
            "profit": 85.7
        },
        {
            "id": 77,
            "ref": "V534  LISO",
            "group_id": 1,
            "name": "",
            "cost": 20.17,
            "price": 44.9,
            "profit": 122.6
        },
        {
            "id": 78,
            "ref": "V433",
            "group_id": 1,
            "name": "",
            "cost": 31.05,
            "price": 64.9,
            "profit": 109
        },
        {
            "id": 79,
            "ref": "TESTE BLUSA DRY CAPUX",
            "group_id": 1,
            "name": "",
            "cost": 26.47,
            "price": 49.9,
            "profit": 88.5
        },
        {
            "id": 80,
            "ref": "TESTE BLUSA DRY MASC",
            "group_id": 1,
            "name": "",
            "cost": 21.94,
            "price": 44.9,
            "profit": 104.6
        },
        {
            "id": 81,
            "ref": "BLUSA WINTER M.CAIDO",
            "group_id": 1,
            "name": "",
            "cost": 22.68,
            "price": 49.9,
            "profit": 120
        },
        {
            "id": 82,
            "ref": "B542  BL.MOLETINHO RAGLAN",
            "group_id": 1,
            "name": "",
            "cost": 43.7,
            "price": 89.9,
            "profit": 105.7
        },
        {
            "id": 83,
            "ref": "TESTES NOVO",
            "group_id": 1,
            "name": "",
            "cost": 16.43,
            "price": 0,
            "profit": 0
        },
        {
            "id": 84,
            "ref": "CL545 CALÇA COURO",
            "group_id": 1,
            "name": "",
            "cost": 61.510000000000005,
            "price": 119.9,
            "profit": 94.9
        },
        {
            "id": 85,
            "ref": "CL474 CALÇA COURO",
            "group_id": 1,
            "name": "",
            "cost": 68.67,
            "price": 129.9,
            "profit": 89.2
        },
        {
            "id": 86,
            "ref": "CL544 CALÇA MOLETINHO FRIZO",
            "group_id": 1,
            "name": "",
            "cost": 34.57,
            "price": 69.9,
            "profit": 102.2
        },
        {
            "id": 87,
            "ref": "CL 35 CALÇA MOLETON FEM.C/PUNHO",
            "group_id": 1,
            "name": "",
            "cost": 37.06,
            "price": 79.9,
            "profit": 115.6
        },
        {
            "id": 88,
            "ref": "CL35 CALÇA MOL.FEM.C/PUNHO",
            "group_id": 1,
            "name": "",
            "cost": 35.63,
            "price": 79.9,
            "profit": 124.2
        },
        {
            "id": 89,
            "ref": "CL 35 CALÇA MOL. FEM.C/PUN",
            "group_id": 1,
            "name": "",
            "cost": 37.03,
            "price": 79.9,
            "profit": 115.8
        },
        {
            "id": 90,
            "ref": "CL546 CALÇA MOLETOM MASC.S/PUNHO",
            "group_id": 1,
            "name": "",
            "cost": 38.42,
            "price": 79.9,
            "profit": 108
        },
        {
            "id": 91,
            "ref": "B548",
            "group_id": 1,
            "name": "",
            "cost": 23.12,
            "price": 44.9,
            "profit": 94.2
        },
        {
            "id": 92,
            "ref": "CS549",
            "group_id": 1,
            "name": "",
            "cost": 58.22,
            "price": 119.9,
            "profit": 105.9
        },
        {
            "id": 93,
            "ref": "CL547",
            "group_id": 1,
            "name": "",
            "cost": 39.95,
            "price": 79.9,
            "profit": 100
        },
        {
            "id": 94,
            "ref": "CS550",
            "group_id": 1,
            "name": "",
            "cost": 69.05,
            "price": 149.9,
            "profit": 117.1
        },
        {
            "id": 95,
            "ref": "CS366",
            "group_id": 1,
            "name": "",
            "cost": 70.21,
            "price": 149.9,
            "profit": 113.5
        },
        {
            "id": 96,
            "ref": "J551",
            "group_id": 1,
            "name": "",
            "cost": 51.85,
            "price": 99.9,
            "profit": 92.7
        },
        {
            "id": 97,
            "ref": "J552",
            "group_id": 1,
            "name": "",
            "cost": 41.99,
            "price": 79.9,
            "profit": 90.3
        },
        {
            "id": 98,
            "ref": "CS553",
            "group_id": 1,
            "name": "",
            "cost": 46.53,
            "price": 89.9,
            "profit": 93.2
        },
        {
            "id": 99,
            "ref": "MT46",
            "group_id": 1,
            "name": "",
            "cost": 47.62,
            "price": 94.9,
            "profit": 99.3
        },
        {
            "id": 100,
            "ref": "MT555",
            "group_id": 1,
            "name": "",
            "cost": 37.56,
            "price": 79.9,
            "profit": 112.7
        },
        {
            "id": 101,
            "ref": "MT554",
            "group_id": 1,
            "name": "",
            "cost": 35.3,
            "price": 74.9,
            "profit": 112.2
        },
        {
            "id": 102,
            "ref": "MT402",
            "group_id": 1,
            "name": "",
            "cost": 52.78999999999999,
            "price": 109.9,
            "profit": 108.2
        },
        {
            "id": 103,
            "ref": "MT557",
            "group_id": 1,
            "name": "",
            "cost": 53.1,
            "price": 109.9,
            "profit": 107
        },
        {
            "id": 104,
            "ref": "CS558",
            "group_id": 1,
            "name": "",
            "cost": 40.32,
            "price": 89.9,
            "profit": 123
        },
        {
            "id": 105,
            "ref": "CS559",
            "group_id": 1,
            "name": "",
            "cost": 41.14,
            "price": 89.9,
            "profit": 118.5
        },
        {
            "id": 106,
            "ref": "J565",
            "group_id": 1,
            "name": "",
            "cost": 40.11,
            "price": 84.9,
            "profit": 111.7
        },
        {
            "id": 107,
            "ref": "J566",
            "group_id": 1,
            "name": "",
            "cost": 55.4,
            "price": 119.9,
            "profit": 116.4
        },
        {
            "id": 108,
            "ref": "B567",
            "group_id": 1,
            "name": "",
            "cost": 20.21,
            "price": 39.9,
            "profit": 97.4
        },
        {
            "id": 109,
            "ref": "B568",
            "group_id": 1,
            "name": "",
            "cost": 21.8,
            "price": 44.9,
            "profit": 106
        },
        {
            "id": 110,
            "ref": "CL467",
            "group_id": 1,
            "name": "",
            "cost": 34.41,
            "price": 69.9,
            "profit": 103.1
        },
        {
            "id": 111,
            "ref": "J569",
            "group_id": 1,
            "name": "",
            "cost": 40.11,
            "price": 84.9,
            "profit": 111.7
        },
        {
            "id": 112,
            "ref": "MT46 ESPECIAL",
            "group_id": 1,
            "name": "",
            "cost": 60.8,
            "price": 119.9,
            "profit": 97.2
        },
        {
            "id": 113,
            "ref": "B570",
            "group_id": 1,
            "name": "",
            "cost": 28.63,
            "price": 59.9,
            "profit": 109.2
        },
        {
            "id": 114,
            "ref": "J571",
            "group_id": 1,
            "name": "",
            "cost": 30.21,
            "price": 64.9,
            "profit": 114.8
        },
        {
            "id": 115,
            "ref": "B540",
            "group_id": 1,
            "name": "",
            "cost": 17.5,
            "price": 34.9,
            "profit": 99.4
        }
    ])
}