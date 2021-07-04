import { Request, Response } from 'express'
import NeedlewomansService from '../services/NeedlewomansService'

class NeedlewomansController {
  async index(req: Request, res: Response) {
    const needlewomansService = new NeedlewomansService()

    const needlewomans = await needlewomansService.getNeedlewomans()

    res.json(needlewomans)
  }

  async create(req: Request, res: Response) {
    const needlewomansService = new NeedlewomansService()

    await needlewomansService.createNeedlewoman(req.body)

    res.status(201).send()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const needlewomansService = new NeedlewomansService()

    await needlewomansService.updateNeedlewoman(id, req.body)

    res.send()
  }
}

export default NeedlewomansController
