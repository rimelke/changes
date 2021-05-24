import { Request, Response } from 'express'
import FabricsService from '../services/FabricsService'

class FabricsController {
  async index(req: Request, res: Response) {
    const fabricsService = new FabricsService()

    const fabrics = await fabricsService.getFabrics()

    res.json(fabrics)
  }

  async create(req: Request, res: Response) {
    const fabricsService = new FabricsService()

    await fabricsService.createFabric(req.body)

    res.status(201).send()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const fabricsService = new FabricsService()

    await fabricsService.updateFabric(id, req.body)

    res.send()
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const fabricsService = new FabricsService()

    await fabricsService.deleteFabric(id)

    res.send()
  }
}

export default FabricsController
