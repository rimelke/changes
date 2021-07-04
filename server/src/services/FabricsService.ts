import Joi from 'joi'
import { getCustomRepository } from 'typeorm'
import Fabric from '../entities/Fabric'
import AppError from '../errors/AppError'
import FabricsRepository from '../repositories/FabricsRepository'
import ProductFabricsRepository from '../repositories/ProductFabricsRepository'
import ProvidersRepository from '../repositories/ProvidersRepository'

class FabricsService {
  private fabricsRepository: FabricsRepository
  private providersRepository: ProvidersRepository
  private productFabricsRepository: ProductFabricsRepository

  constructor() {
    this.fabricsRepository = getCustomRepository(FabricsRepository)
    this.providersRepository = getCustomRepository(ProvidersRepository)
    this.productFabricsRepository = getCustomRepository(
      ProductFabricsRepository
    )
  }

  async getFabrics() {
    return this.fabricsRepository.find({ relations: ['provider'] })
  }

  async createFabric(data: any) {
    const schema = Joi.object().keys({
      providerId: Joi.string().required(),
      name: Joi.string().required(),
      grammage: Joi.number().positive().integer().required(),
      width: Joi.number().positive().precision(2).required(),
      price: Joi.number().positive().precision(2).required()
    })

    const value = await schema.validateAsync(data)

    const provider = await this.providersRepository.findOne(value.providerId)

    if (!provider) throw new AppError('Invalid providerId.')

    const fabric = new Fabric({
      ...value,
      finalPrice: Math.round(value.price * (100 + provider.tax)) / 100
    })

    await this.fabricsRepository.save(fabric)
  }

  async updateFabric(id: string, data: any) {
    const schema = Joi.object()
      .keys({
        providerId: Joi.string(),
        name: Joi.string(),
        grammage: Joi.number().positive().integer(),
        width: Joi.number().positive().precision(2),
        price: Joi.number().positive().precision(2)
      })
      .min(1)

    const value = await schema.validateAsync(data)

    await this.fabricsRepository.update({ id }, value)

    if (value.providerId || value.price !== undefined) {
      const fabric = await this.fabricsRepository.findOne(id, {
        relations: ['provider']
      })

      await this.fabricsRepository.update(
        { id },
        {
          finalPrice:
            Math.round(fabric.price * (100 + fabric.provider.tax)) / 100
        }
      )

      this.fabricsRepository.cascadeUpdates(id)
    }
  }

  async deleteFabric(id: string) {
    const hasProducts = await this.productFabricsRepository.findOne({
      fabricId: id
    })

    if (hasProducts) throw new AppError('There are products with this fabric.')

    return this.fabricsRepository.delete({ id })
  }
}

export default FabricsService
