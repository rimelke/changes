import { getCustomRepository } from 'typeorm'
import ServicesRepository from '../repositories/ServicesRepository'

class ServicesService {
  private servicesRepository: ServicesRepository

  constructor() {
    this.servicesRepository = getCustomRepository(ServicesRepository)
  }

  getServices() {
    return this.servicesRepository.find()
  }
}

export default ServicesService
