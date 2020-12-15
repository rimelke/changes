import { Transaction } from "knex";

export default async function calcProduct(product_id: number, trx: Transaction) {
    const fabrics = await trx('product_fabrics').where('product_id', product_id)
    const costs = await trx('costs').where('product_id', product_id)
}