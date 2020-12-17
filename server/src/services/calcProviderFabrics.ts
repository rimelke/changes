import { Transaction } from "knex";
import calcFabricProducts from "./calcFabricProducts";

export default async function calcProviderFabrics(provider_id: number, trx: Transaction) {
    const provider = await trx('providers').where('id', provider_id).first()
    const fabrics = await trx('fabrics').where('provider_id', provider_id)

    for (let fabric of fabrics) {
        await trx('fabrics').update({
            final_price: Number(((fabric.price * provider.tax / 100) + fabric.price).toFixed(2))
        }).where('id', fabric.id)

        await calcFabricProducts(fabric.id, trx)
    }
}