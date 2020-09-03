import {Request, Response} from 'express'
import db from '../config/knex'

export default {
    async index(req: Request, res: Response) {
        const groups = await db('groups')

        res.json(groups)
    },

    async create(req: Request, res: Response) {
        const {
            name
        } = req.body

        try {
            await db('groups').insert({name})

            res.status(201).send()
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    }
}