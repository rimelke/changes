import { Request, Response } from 'express'
import NeedlewomansService from '../services/NeedlewomansService'

class NeedlewomansController {
  async index(req: Request, res: Response) {
    const needlewomansService = new NeedlewomansService()

    const needlewomans = await needlewomansService.getNeedlewomans()

    res.json(needlewomans)
  }
}

export default NeedlewomansController
