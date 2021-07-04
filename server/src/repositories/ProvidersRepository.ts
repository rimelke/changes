import { EntityRepository, getCustomRepository, Repository } from 'typeorm'
import Provider from '../entities/Provider'
import FabricsRepository from './FabricsRepository'
import GroupsRepository from './GroupsRepository'
import ProductFabricsRepository from './ProductFabricsRepository'
import ProductsRepository from './ProductsRepository'

@EntityRepository(Provider)
class ProvidersRepository extends Repository<Provider> {
  async cascadeUpdates(providerId: string) {
    const fabricsRepository = getCustomRepository(FabricsRepository)
    const productFabricsRepository = getCustomRepository(
      ProductFabricsRepository
    )
    const productsRepository = getCustomRepository(ProductsRepository)
    const groupsRepository = getCustomRepository(GroupsRepository)

    const fabricsIds = await fabricsRepository.updateFinalPrices(providerId)

    const productsIds = [
      ...new Set(
        (
          await Promise.all(
            fabricsIds.map((fabricId) =>
              productFabricsRepository.updateFinalPriceAndSubtotals(fabricId)
            )
          )
        ).reduce(
          (prevProductsIds, currProductsIds) => [
            ...prevProductsIds,
            ...currProductsIds
          ],
          []
        )
      )
    ]

    const groupsIds = [
      ...new Set(
        await Promise.all(
          productsIds.map((productId) =>
            productsRepository.updateCostAndProfit(productId)
          )
        )
      )
    ]

    await Promise.all(
      groupsIds.map((groupId) => groupsRepository.updateProfit(groupId))
    )
  }
}

export default ProvidersRepository
