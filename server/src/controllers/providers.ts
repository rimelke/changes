import {Request, Response} from 'express'
import db from '../config/db'
import calcProviderFabrics from '../services/calcProviderFabrics'

export default {
    async index(req: Request, res: Response) {
        const providers = await db('providers')
        res.json(providers)
    },

    async create(req: Request, res: Response) {
        try {
            await db('providers').insert(req.body)

            res.status(201).send()
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    },
    
    async update(req: Request, res: Response) {
        const { id } = req.params

        const trx = await db.transaction()

        try {
            await trx('providers').update(req.body).where('id', id)

            if (req.body.tax)
                await calcProviderFabrics(Number(id), trx)

            await trx.commit()

            res.status(200).send()
        } catch (e) {
            await trx.rollback(e)

            console.log(e)
            res.status(400).json({message: 'An error occured, try again'})
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            const fabrics = await db('fabrics').where('provider_id', id)

            if (fabrics.length > 0)
                return res.status(400).json({message: 'There are fabrics linked to this provider'})

            await db('providers').del().where('id', id)

            res.status(200).send()
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    }
}