import Joi from 'joi'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import FabricsRepository from '../repositories/FabricsRepository'
import GroupsRepository from '../repositories/GroupsRepository'
import ProductsRepository from '../repositories/ProductsRepository'

class ProductsService {
  private productsRepository: ProductsRepository
  private groupsRepository: GroupsRepository
  private fabricsRepository: FabricsRepository

  constructor() {
    this.productsRepository = getCustomRepository(ProductsRepository)
    this.groupsRepository = getCustomRepository(GroupsRepository)
    this.fabricsRepository = getCustomRepository(FabricsRepository)
  }

  async getProducts(params: any = {}) {
    const schema = Joi.object().keys({
      take: Joi.number().positive().integer().max(100),
      skip: Joi.number().positive().integer(),
      groupId: Joi.string()
    })

    const value = await schema.validateAsync(params)

    const [data, total] = await this.productsRepository.findAndCount({
      ...value,
      where: value.groupId ? { groupId: value.groupId } : {},
      relations: ['group']
    })

    console.log({
      ...value,
      relations: ['group']
    })

    return { total, data }
  }

  async getProductById(id: string) {
    return this.productsRepository.findOne(id, {
      relations: ['group', 'costs', 'fabrics', 'fabrics.fabric', 'fabrics.fabric.provider']
    })
  }

  async createProduct(data: any) {
    const schema = Joi.object().keys({
      ref: Joi.string().uppercase().required(),
      groupId: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().positive().precision(2),
      costs: Joi.array()
        .items(
          Joi.object().keys({
            name: Joi.string().required(),
            value: Joi.number().positive().precision(2).required()
          })
        )
        .default([]),
      fabrics: Joi.array()
        .items(
          Joi.object().keys({
            fabricId: Joi.string().required(),
            efficiency: Joi.number().positive().precision(3).required()
          })
        )
        .default([])
    })

    const value = await schema.validateAsync(data)

    const refIsUsed = await this.productsRepository.findOne({ ref: value.ref })

    if (refIsUsed) throw new AppError('Ref already used.')

    const group = await this.groupsRepository.findOne(value.groupId)

    if (!group) throw new AppError('Invalid groupId.')

    const dbFabrics = await this.fabricsRepository.findByIds(
      value.fabrics.map((fabric) => fabric.fabricId)
    )

    let cost = 0

    const fabrics = value.fabrics.map((rawFabric, index) => {
      const dbFabric = dbFabrics.find(
        (dbFabric) => rawFabric.fabricId === dbFabric.id
      )

      if (!dbFabric) {
        throw new AppError(`Invalid fabricId at fabrics[${index}].`)
      }

      const subtotal =
        Math.round(100 * dbFabric.finalPrice * rawFabric.efficiency) / 100

      cost += subtotal

      return {
        ...rawFabric,
        finalPrice: dbFabric.finalPrice,
        subtotal
      }
    })

    value.costs.forEach((rawCost) => (cost += rawCost.value))

    const profit =
      value.price && cost !== 0
        ? Math.round((1000 * (value.price - cost)) / cost) / 10
        : null

    const product = this.productsRepository.create({
      ...value,
      fabrics,
      cost,
      profit
    })

    await this.productsRepository.save(product)

    this.groupsRepository.updateProfit(value.groupId)
  }

  async updateProduct(id: string, data: any) {
    const schema = Joi.object().keys({
      ref: Joi.string().uppercase(),
      groupId: Joi.string(),
      name: Joi.string(),
      price: Joi.number().positive().precision(2),
      costs: Joi.array()
        .items(
          Joi.object().keys({
            id: Joi.string().length(25),
            name: Joi.string().required(),
            value: Joi.number().positive().precision(2).required()
          })
        )
        .default([]),
      fabrics: Joi.array()
        .items(
          Joi.object().keys({
            id: Joi.string().length(25),
            fabricId: Joi.string().required(),
            efficiency: Joi.number().positive().precision(3).required()
          })
        )
        .default([])
    })

    const value = await schema.validateAsync(data)

    if (value.ref) {
      const refIsUsed = await this.productsRepository.findOne({
        ref: value.ref
      })

      if (refIsUsed && refIsUsed.id !== id) {
        throw new AppError('Ref already used.')
      }
    }

    if (value.groupId) {
      const group = await this.groupsRepository.findOne(value.groupId)

      if (!group) throw new AppError('Invalid groupId.')
    }

    let cost = 0

    const dbFabrics = await this.fabricsRepository.findByIds(
      value.fabrics.map((fabric) => fabric.fabricId)
    )

    const fabrics = value.fabrics.map((rawFabric, index) => {
      const dbFabric = dbFabrics.find(
        (dbFabric) => rawFabric.fabricId === dbFabric.id
      )

      if (!dbFabric) {
        throw new AppError(`Invalid fabricId at fabrics[${index}].`)
      }

      const subtotal =
        Math.round(100 * dbFabric.finalPrice * rawFabric.efficiency) / 100

      cost += subtotal

      return {
        ...rawFabric,
        finalPrice: dbFabric.finalPrice,
        subtotal
      }
    })

    value.costs.forEach((rawCost) => (cost += rawCost.value))

    const profit =
      value.price && cost !== 0
        ? Math.round((1000 * (value.price - cost)) / cost) / 10
        : null

    const savedProduct = await this.productsRepository.findOne(id)

    const mergedProduct = this.productsRepository.merge(savedProduct, {
      ...value,
      cost,
      profit,
      fabrics
    })

    await this.productsRepository.save(mergedProduct)

    if (value.groupId) {
      this.groupsRepository.updateProfit(savedProduct.groupId)
      this.groupsRepository.updateProfit(value.groupId)
    }
  }

  async deleteProduct(id: string) {
    return this.productsRepository.delete({ id })
  }
}

export default ProductsService
