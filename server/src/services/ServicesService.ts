import Joi from 'joi'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import NeedlewomansRepository from '../repositories/NeedlewomansRepository'
import ProductsRepository from '../repositories/ProductsRepository'
import ServicesRepository from '../repositories/ServicesRepository'
import BudgetsService from './BudgetsService'

interface ICreateServiceData {
  needlewomanId: string
  deliveryDate?: string
  withdrawalDate?: string
  isPayed?: boolean
  products: {
    productId: string
    amount: number
  }[]
}

interface IParsedServiceProduct {
  productId: string
  amount: number
  unitValue: number
  totalValue: number
}

interface IUpdateServiceData {
  needlewomanId?: string
  deliveryDate?: string
  withdrawalDate?: string
  amount?: number
  value?: number
  duration?: number
  isPayed?: boolean
  products?: {
    productId: string
    amount: number
  }[]
}

interface IPayServiceData {
  date: string
  categoryId: string
  description: string
}

class ServicesService {
  private servicesRepository: ServicesRepository
  private needlewomansRepository: NeedlewomansRepository
  private productsRepository: ProductsRepository

  private budgetsService: BudgetsService

  constructor() {
    this.servicesRepository = getCustomRepository(ServicesRepository)
    this.needlewomansRepository = getCustomRepository(NeedlewomansRepository)
    this.productsRepository = getCustomRepository(ProductsRepository)

    this.budgetsService = new BudgetsService()
  }

  getServices() {
    return this.servicesRepository.find({
      relations: ['needlewoman'],
      take: 30,
      order: { incrementId: 'DESC' }
    })
  }

  getServiceById(id: string) {
    return this.servicesRepository.findOne(id, {
      relations: ['products', 'products.product', 'needlewoman']
    })
  }

  async createService(data: ICreateServiceData) {
    const schema = Joi.object<ICreateServiceData>().keys({
      needlewomanId: Joi.string().required(),
      deliveryDate: Joi.date().iso().raw(),
      withdrawalDate: Joi.when('deliveryDate', {
        not: null,
        then: Joi.date().min(Joi.ref('deliveryDate')).iso().raw(),
        otherwise: Joi.forbidden()
      }),
      products: Joi.array()
        .items(
          Joi.object().keys({
            productId: Joi.string().required(),
            amount: Joi.number().positive().integer().required()
          })
        )
        .required()
        .min(1)
    })

    const value: ICreateServiceData = await schema.validateAsync(data)

    const needlewomanExists = await this.needlewomansRepository.findOne(
      value.needlewomanId
    )
    if (!needlewomanExists) throw new AppError('Invalid needlewomanId.')

    const selectedProducts = await this.productsRepository.findByIds(
      value.products.map((product) => product.productId),
      { relations: ['costs'] }
    )

    let amount = 0
    let productsValue = 0
    const products: IParsedServiceProduct[] = value.products.map(
      (product, index) => {
        const savedProduct = selectedProducts.find(
          (savedProduct) => savedProduct.id === product.productId
        )

        if (!savedProduct) {
          throw new AppError(`Invalid productId at products[${index}].`)
        }

        const unitValue =
          savedProduct.costs.find(
            (cost) =>
              cost.name.toLowerCase().replace('ã', 'a').includes('mao') &&
              cost.name.toLowerCase().includes('obra')
          )?.value || 0
        const totalValue = product.amount * unitValue

        amount += product.amount
        productsValue += totalValue

        return {
          ...product,
          unitValue,
          totalValue
        }
      }
    )

    const service = this.servicesRepository.create({
      ...value,
      amount,
      value: productsValue,
      products
    })

    if (value.withdrawalDate) {
      service.duration = Math.ceil(
        (Number(new Date(value.withdrawalDate)) -
          Number(new Date(value.deliveryDate))) /
          86400000
      )
    }

    await this.servicesRepository.save(service)
  }

  async updateService(id: string, data: IUpdateServiceData) {
    const schema = Joi.object<IUpdateServiceData>()
      .keys({
        needlewomanId: Joi.string(),
        deliveryDate: Joi.date().iso().raw(),
        withdrawalDate: Joi.date().iso().raw(),
        products: Joi.array()
          .items(
            Joi.object().keys({
              productId: Joi.string().required(),
              amount: Joi.number().positive().integer().required()
            })
          )
          .min(1)
      })
      .min(1)

    const value: IUpdateServiceData = await schema.validateAsync(data)

    const service = await this.servicesRepository.findOne(id)
    if (!service) throw new AppError('Service not found.')

    if (value.withdrawalDate || value.deliveryDate) {
      if (
        value.withdrawalDate &&
        !(value.deliveryDate || service.deliveryDate)
      ) {
        throw new AppError(
          'withdrawalDate cannot be defined without deliveryDate.'
        )
      }

      if (
        (value.withdrawalDate || service.withdrawalDate) &&
        new Date(value.withdrawalDate || service.withdrawalDate) <
          new Date(value.deliveryDate || service.deliveryDate)
      ) {
        throw new AppError(
          'withdrawalDate cannot be smaller than deliveryDate.'
        )
      }

      value.duration = Math.ceil(
        (Number(new Date(value.withdrawalDate || service.withdrawalDate)) -
          Number(new Date(value.deliveryDate || service.deliveryDate))) /
          86400000
      )
    }

    if (value.needlewomanId) {
      const needlewomanExists = await this.needlewomansRepository.findOne(
        value.needlewomanId
      )

      if (!needlewomanExists) throw new AppError('Invalid needlewomanId.')
    }

    if (value.products) {
      const selectedProducts = await this.productsRepository.findByIds(
        value.products.map((product) => product.productId),
        { relations: ['costs'] }
      )

      let amount = 0
      let productsValue = 0
      const products: IParsedServiceProduct[] = value.products.map(
        (product, index) => {
          const savedProduct = selectedProducts.find(
            (savedProduct) => savedProduct.id === product.productId
          )

          if (!savedProduct) {
            throw new AppError(`Invalid productId at products[${index}].`)
          }

          const unitValue =
            savedProduct.costs.find(
              (cost) =>
                cost.name.toLowerCase().replace('ã', 'a').includes('mao') &&
                cost.name.toLowerCase().includes('obra')
            )?.value || 0
          const totalValue = product.amount * unitValue

          amount += product.amount
          productsValue += totalValue

          return {
            ...product,
            unitValue,
            totalValue
          }
        }
      )

      value.products = products
      value.amount = amount
      value.value = productsValue
    }

    const updatedService = this.servicesRepository.merge(service, value)

    await this.servicesRepository.save(updatedService)
  }

  async payService(id: string, data: IPayServiceData) {
    const service = await this.servicesRepository.findOne(id)

    if (!service) throw new AppError('Service not found.')

    if (service.isPayed) throw new AppError('Service is already payed.')

    const { id: budgetId } = await this.budgetsService.createBudget({
      ...data,
      value: service.value,
      referenceId: service.id,
      referenceType: 'service'
    })

    await this.servicesRepository.update({ id }, { isPayed: true, budgetId })
  }

  async deleteService(id: string) {
    const service = await this.servicesRepository.findOne(id)

    if (service.isPayed) throw new AppError('Cannot delete a payed service.')

    await this.servicesRepository.delete({ id })
  }
}

export default ServicesService
