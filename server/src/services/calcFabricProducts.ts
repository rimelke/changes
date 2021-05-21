import { Transaction } from "knex";
import calcGroupProfit from "./calcGroupProfit";
import calcProduct from "./calcProduct";

export default async function calcFabricProducts(fabric_id: number, trx: Transaction) {
    const products = await trx('product_fabrics')
        .join('products', 'product_fabrics.product_id', '=', 'products.id')
        .select(['product_fabrics.*', 'products.group_id'])
        .where('product_fabrics.fabric_id', fabric_id)
    const fabric = await trx('fabrics').where('id', fabric_id).first()
    const product_ids = [...new Set(products.map(product => product.product_id))]
    const group_ids = [...new Set(products.map(product => product.group_id))]

    await Promise.all(products.map(async product => {
        await trx('product_fabrics')
            .update({
                final_price: Number(fabric.final_price),
                subtotal: Number((Number(fabric.final_price) * Number(product.efficiency)).toFixed(2))
            }).where('id', product.id)
    }))

    await Promise.all(product_ids.map(async product_id => {
        await calcProduct(product_id, trx)
    }))

    await Promise.all(group_ids.map(async group_id => {
        await calcGroupProfit(group_id, trx)
    }))
}