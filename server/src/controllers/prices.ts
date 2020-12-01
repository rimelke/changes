import {Request, Response} from 'express'
import db from '../config/db'

export default {
    async index(req: Request, res: Response) {
        try {
            const prices = await db('prices')

            res.json(prices)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'something went wrong, try again'})
        }
    },

    async show(req: Request, res: Response) {
        const { id } = req.params
        
        try {
            const price = await db('prices').where('id', id).first()

            if (price) {
                res.json(price)
            } else res.status(400).json({message: 'price not found'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'something went wrong, try again'})
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const trx = await db.transaction()

        try {
            await trx('prices').update(req.body).where('id', id)

            if (req.body.default && req.body.default === true)
                await trx('prices').update({default: false}).whereNot('id', id)

            await trx.commit()
            res.send()
        } catch (e) {
            await trx.rollback(e)
            console.log(e)
            res.status(400).json({message: 'something went wrong, try again'})
        }
    },
    
    async create(req: Request, res: Response) {
        try {
            await db('prices').insert(req.body)

            res.status(201).send()
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'something went wrong, try again'})
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            await db('prices').where('id', id).del()

            res.send()
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'something went wrong, try again'})
        }
    }
}