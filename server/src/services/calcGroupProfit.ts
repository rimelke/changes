import { Transaction } from 'knex'

export default async function calcGroupProfit(group_id: number, trx: Transaction) {
    const products = await trx('products').where('group_id', group_id)

    let sumCosts = 0
    let sumDifs = 0
    let profit = null
    for (let product of products) {
        sumCosts += product.cost
        sumDifs += product.price - product.cost
    }

    if (sumCosts !== 0)
        profit = Number((sumDifs * 100 / sumCosts).toFixed(0))

    await trx('groups').update({profit}).where('id', group_id)
}