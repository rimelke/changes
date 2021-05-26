import { EntityRepository, getCustomRepository, Repository } from 'typeorm'
import Group from '../entities/Group'
import ProductsRepository from './ProductsRepository'

@EntityRepository(Group)
class GroupsRepository extends Repository<Group> {
  async updateProfit(groupId: string) {
    const group = await this.findOne(groupId)

    if (group) {
      const productsRepository = getCustomRepository(ProductsRepository)

      const products = await productsRepository.find({ where: { groupId } })

      const sumOfCosts = products
        .filter((product) => product.cost && product.price)
        .map((product) => product.cost)
        .reduce((prevCost, currCost) => prevCost + currCost, 0)

      const sumOfPrices = products
        .filter((product) => product.cost && product.price)
        .map((product) => product.price)
        .reduce((prevPrice, currPrice) => prevPrice + currPrice, 0)

      const profit =
        sumOfCosts > 0
          ? Math.round((1000 * (sumOfPrices - sumOfCosts)) / sumOfCosts) / 10
          : null

      await this.update({ id: groupId }, { profit })
    }
  }
}

export default GroupsRepository
