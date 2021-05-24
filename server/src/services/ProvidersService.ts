import Joi from 'joi'
import { getCustomRepository, Repository } from 'typeorm'
import Provider from '../entities/Provider'
import ProvidersRepository from '../repositories/ProvidersRepository'

class ProvidersService {
  private providersRepository: Repository<Provider>

  constructor() {
    this.providersRepository = getCustomRepository(ProvidersRepository)
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
    return this.providersRepository.delete({ id })
  }
}

export default ProvidersService
