import Joi from 'joi'
import { getCustomRepository, Repository } from 'typeorm'
import Fabric from '../entities/Fabric'
import Provider from '../entities/Provider'
import AppError from '../errors/AppError'
import FabricsRepository from '../repositories/FabricsRepository'
import ProvidersRepository from '../repositories/ProvidersRepository'

class ProvidersService {
  private providersRepository: Repository<Provider>
  private fabricsRepository: Repository<Fabric>

  constructor() {
    this.providersRepository = getCustomRepository(ProvidersRepository)
    this.fabricsRepository = getCustomRepository(FabricsRepository)
  }

  async getProviders() {
    return this.providersRepository.find()
  }

  async createProvider(data: any) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      tax: Joi.number().precision(1).required()
    })

    const value = await schema.validateAsync(data)

    const provider = new Provider(value)

    await this.providersRepository.save(provider)
  }

  async updateProvider(id: string, data: any) {
    const schema = Joi.object()
      .keys({
        name: Joi.string(),
        tax: Joi.number().precision(1)
      })
      .min(1)

    const value = await schema.validateAsync(data)

    await this.providersRepository.update({ id }, value)
  }

  async deleteProvider(id: string) {
    const hasFabrics = await this.fabricsRepository.findOne({ providerId: id })

    if (hasFabrics) {
      throw new AppError('The are fabrics related to this provider.')
    }

    return this.providersRepository.delete({ id })
  }
}

export default ProvidersService
