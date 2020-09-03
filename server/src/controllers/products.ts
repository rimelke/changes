import {Request, Response} from 'express'
import db from '../config/knex'

interface Cost {
    name: string
    value: number
}

interface Fabric {
    fabric_id: number
    efficiency: number
}

export default {
    async index(req: Request, res: Response) {
        const products = await db('products')
            .join('groups', 'products.group_id', '=', 'groups.id')
            .select(['products.*', 'groups.name as group_name'])
            .orderBy('products.updated_at', 'desc')

        res.json(products)
    },

    async show(req: Request, res: Response) {
        const { id } = req.params

        const product = await db('products').where('id', id).first()

        if (product) {
            const costs = await db('costs').where('product_id', id)
            const fabrics = await db('product_fabrics').where('product_id', id)

            res.json({...product, costs, fabrics})

        } else res.status(400).json({message: 'Product not found'})
    },

    async create(req: Request, res: Response) {
        const {
            ref,
            group_id,
            name,
            costs,
            fabrics,
            price
        } = req.body

        const trx = await db.transaction()

        let sumCosts = 0

        try {
            const [product_id] = await trx('products').insert({ref, group_id, name, price})

            if (costs) await trx('costs').insert(costs.map((cost: Cost) => {
                sumCosts += cost.value

                return {
                    product_id,
                    ...cost
                }
            }))

            if (fabrics) {
                const parsedFabrics = await Promise.all(fabrics.map(async (fabric: Fabric) => {
                    const { final_price } = await trx('fabrics').where('id', fabric.fabric_id).first()
                    const subtotal = Number((fabric.efficiency * final_price).toFixed(2))

                    sumCosts += subtotal

                    return {
                        product_id,
                        final_price,
                        subtotal,
                        ...fabric
                    }
                }))

                await trx('product_fabrics').insert(parsedFabrics)
            }

            if (costs || fabrics) {
                let profit = null

                if (sumCosts && price && price > sumCosts) profit = Number(((price - sumCosts) * 100 / sumCosts).toFixed(2))
    
                await trx('products').update({profit, cost: sumCosts}).where('id', product_id)    
            }

            await trx.commit()

            res.status(201).send()
        } catch (e) {
            await trx.rollback(e)

            res.status(400).json({message: 'An error occured, try again'})
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        const {
            ref,
            group_id,
            name,
            costs,
            fabrics,
            price
        } = req.body

        const trx = await db.transaction()

        try {
            let sumCosts = 0

            await trx('costs').del().where('product_id', id)

            if (costs) await trx('costs').insert(costs.map((cost: Cost) => {
                sumCosts += cost.value

                return {
                    product_id: id,
                    ...cost
                }
            }))
            
            await trx('product_fabrics').del().where('product_id', id)

            if (fabrics) {
                const parsedFabrics = await Promise.all(fabrics.map(async (fabric: Fabric) => {
                    const { final_price } = await trx('fabrics').where('id', fabric.fabric_id).first()
                    const subtotal = Number((fabric.efficiency * final_price).toFixed(2))

                    sumCosts += subtotal

                    return {
                        product_id: id,
                        final_price,
                        subtotal,
                        ...fabric
                    }
                }))

                await trx('product_fabrics').insert(parsedFabrics)
            }

            let profit = null

            if (sumCosts && price && price > sumCosts) profit = Number(((price - sumCosts) * 100 / sumCosts).toFixed(2))
                
            await trx('products').update({
                ref,
                group_id,
                name,
                cost: sumCosts ? sumCosts : null,
                price,
                profit,
                updated_at: trx.fn.now()
            }).where('id', id)

            await trx.commit()

            res.json({message: 'Product updated'})
        } catch (e) {
            await trx.rollback(e)

            res.status(400).json({message: 'An error occured, try again'})
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        
        try {
            await db('products').del().where('id', id)
    
            res.send()    
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    }
}