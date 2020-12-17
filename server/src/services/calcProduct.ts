import { Transaction } from "knex";

export default async function calcProduct(product_id: number, trx: Transaction) {
    const product = await trx('products').where('id', product_id).first()
    const fabrics = await trx('product_fabrics').where('product_id', product_id)
    const costs = await trx('costs').where('product_id', product_id)

    let sum = 0
    for (let fabric of fabrics)
        sum += fabric.subtotal

    for (let cost of costs)
        sum += cost.value

    sum = Number(sum.toFixed(2))

    const profit = Number(((product.price - sum) * 100 / sum).toFixed(0))
    await trx('products').update({profit, cost: sum}).where('id', product_id)
}