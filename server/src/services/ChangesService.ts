import Joi from 'joi'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import ChangesRepository from '../repositories/ChangesRepository'
import DraftsRepository from '../repositories/DraftsRepository'
import ProductsRepository from '../repositories/ProductsRepository'

class ChangesService {
  private changesRepository: ChangesRepository
  private productsRepository: ProductsRepository
  private draftsRepository: DraftsRepository

  constructor() {
    this.changesRepository = getCustomRepository(ChangesRepository)
    this.productsRepository = getCustomRepository(ProductsRepository)
    this.draftsRepository = getCustomRepository(DraftsRepository)
  }

  async createChange(data: unknown) {
    const schema = Joi.object().keys({
      referenceId: Joi.string().required(),
      referenceType: Joi.valid('product', 'draft').required(),
      description: Joi.string(),
      filename: Joi.string().required(),
      url: Joi.string().uri().required()
    })

    const { referenceType, ...value } = await schema.validateAsync(data)

    const referenceExists =
      referenceType === 'product'
        ? await this.productsRepository.findOne(value.referenceId)
        : await this.draftsRepository.findOne(value.referenceId)

    if (!referenceExists) throw new AppError('Invalid referenceId')

    const change = this.changesRepository.create(value)

    await this.changesRepository.save(change)

    await this[
      referenceType === 'product' ? 'productsRepository' : 'draftsRepository'
    ].update({ id: value.referenceId }, {})
  }

  async updateChange(id: string, data: any) {
    const schema = Joi.object()
      .keys({
        description: Joi.string()
      })
      .min(1)

    const value = await schema.validateAsync(data)

    await this.changesRepository.update({ id }, value)
  }

  async deleteChange(id: string) {
    await this.changesRepository.delete({ id })
  }
}

export default ChangesService
