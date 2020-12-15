import { Transaction } from "knex";
import calcProduct from "./calcProduct";

export default async function calcFabricProducts(fabric_id: number, trx: Transaction) {
    const products = await trx('product_fabrics').where('fabric_id', fabric_id)
    const fabric = await trx('fabrics').where('fabric_id', fabric_id).first()
    const product_ids = [...new Set(products.map(product => product.product_id))]

    await Promise.all(products.map(async product => {
        await trx('product_fabrics')
            .update({
                final_price: fabric.final_price,
                subtotal: Number((fabric.final_price * product.efficiency).toFixed(2))
            }).where('id', product.id)
    }))

    await Promise.all(product_ids.map(async product_id => {
        await calcProduct(product_id, trx)
    }))
}