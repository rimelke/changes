import {Request, Response} from 'express'
import db from '../config/knex'

export default {
    async index(req: Request, res: Response) {
        const { provider_id } = req.query
        let fabrics = []
        if (provider_id) fabrics = await db('fabrics').where('provider_id', provider_id as string)
        else fabrics = await db('fabrics')
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
            await db('fabrics').del().where('id', id)

            res.status(200).send()
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    }
}