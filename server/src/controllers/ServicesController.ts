import { Request, Response } from 'express'
import ServicesService from '../services/ServicesService'

class ServicesController {
  async index(req: Request, res: Response) {
    const servicesService = new ServicesService()

    const services = await servicesService.getServices()

    console.log(services[2])

    res.json(services)
  }

  async create(req: Request, res: Response) {
    const servicesService = new ServicesService()

    await servicesService.createService(req.body)

    res.status(201).send()
  }
}

export default ServicesController
