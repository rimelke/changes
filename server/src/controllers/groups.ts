import {Request, Response} from 'express'
import db from '../config/db'

export default {
    async index(req: Request, res: Response) {
        const groups = await db('groups')

        res.json(groups)
    },

    async create(req: Request, res: Response) {
        try {
            await db('groups').insert(req.body)

            res.status(201).send()
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        try {
            await db('groups').update(req.body).where('id', id)

            res.status(200).send()
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            const products = await db('products').where('group_id', id)

            if (products.length > 0)
                return res.status(400).json({message: 'There are products linked to this group'})

            await db('groups').del().where('id', id)

            res.status(200).send()
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    }
}