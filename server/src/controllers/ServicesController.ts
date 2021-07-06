import { Request, Response } from 'express'
import ServicesService from '../services/ServicesService'

class ServicesController {
  async index(req: Request, res: Response) {
    const servicesService = new ServicesService()

    const services = await servicesService.getServices()

    res.json(services)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const servicesService = new ServicesService()

    const service = await servicesService.getServiceById(id)

    res.json(service)
  }

  async create(req: Request, res: Response) {
    const servicesService = new ServicesService()

    await servicesService.createService(req.body)

    res.status(201).send()
  }
}

export default ServicesController
