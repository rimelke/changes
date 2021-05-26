import { EntityRepository, getCustomRepository, Repository } from 'typeorm'
import Fabric from '../entities/Fabric'
import GroupsRepository from './GroupsRepository'
import ProductFabricsRepository from './ProductFabricsRepository'
import ProductsRepository from './ProductsRepository'
import ProvidersRepository from './ProvidersRepository'

@EntityRepository(Fabric)
class FabricsRepository extends Repository<Fabric> {
  async cascadeUpdates(fabricId: string) {
    const productFabricsRepository = getCustomRepository(
      ProductFabricsRepository
    )
    const productsRepository = getCustomRepository(ProductsRepository)
    const groupsRepository = getCustomRepository(GroupsRepository)

    const productsIds =
      await productFabricsRepository.updateFinalPriceAndSubtotals(fabricId)

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

  async updateFinalPrices(providerId: string) {
    const providersRepository = getCustomRepository(ProvidersRepository)

    const provider = await providersRepository.findOne(providerId)

    if (provider) {
      const fabrics = await this.find({ where: { providerId } })

      return Promise.all(
        fabrics.map(async (fabric) => {
          await this.update(
            { id: fabric.id },
            {
              finalPrice: Math.round(fabric.price * (100 + provider.tax)) / 100
            }
          )

          return fabric.id
        })
      )
    }

    return []
  }
}

export default FabricsRepository
