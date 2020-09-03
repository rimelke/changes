import {Request, Response} from 'express'
import db from '../config/knex'

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

        try {
            await db('providers').update(req.body).where('id', id)

            res.status(200).send()
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            await db('providers').del().where('id', id)

            res.status(200).send()
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    }
}