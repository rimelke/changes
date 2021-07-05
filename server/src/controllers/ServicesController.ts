import { Request, Response } from 'express'
import ServicesService from '../services/ServicesService'

class ServicesController {
  async index(req: Request, res: Response) {
    const servicesService = new ServicesService()

    const services = await servicesService.getServices()

    res.json(services)
  }
}

export default ServicesController
