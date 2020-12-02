import {Request, Response} from 'express'
import db from '../config/db'

export default {
    async index(req: Request, res: Response) {
        let fabrics = await db('fabrics')
            .join('providers', 'fabrics.provider_id', '=', 'providers.id')
            .select(['fabrics.*', 'providers.name as provider_name'])
        res.json(fabrics)
    },

    async create(req: Request, res: Response) {
        const {provider_id, price} = req.body

        try {
            const {tax} = await db('providers').where('id', provider_id).first()

            const final_price = Number((price * (100 + tax) / 100).toFixed(2))

            await db('fabrics').insert({...req.body, final_price})

            res.status(201).send()
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'An error occured, try again'})
        }
    },
    
    async update(req: Request, res: Response) {
        const { id } = req.params

        const trx = await db.transaction()

        try {
            await trx('fabrics').update(req.body).where('id', id)

            if (req.body.price || req.body.provider_id) {
                const {provider_id, price} = await trx('fabrics').where('id', id).first()

                const test = await trx('providers').where('id', provider_id)

                const final_price = Number((price * (100 + test[0].tax) / 100).toFixed(2))

                await trx('fabrics').update({final_price}).where('id', id)
            }

            await trx.commit()

            res.status(200).send()
        } catch (e) {
            await trx.rollback(e)

            res.status(400).json({message: 'An error occured, try again'})
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            const products = await db('product_fabrics').where('fabric_id', id)

            if (products.length > 0)
                return res.status(400).json({message: 'There are products linked to this fabric'})

            await db('fabrics').del().where('id', id)

            res.status(200).send()
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    }
}