import { EntityRepository, Repository } from 'typeorm'
import Product from '../entities/Product'

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
  async updateCostAndProfit(productId: string) {
    const product = await this.findOne(productId, {
      relations: ['costs', 'fabrics']
    })

    if (product) {
      let cost = 0

      product.fabrics.forEach((fabric) => (cost += fabric.subtotal))

      product.costs.forEach((savedCost) => (cost += savedCost.value))

      const profit =
        product.price && cost !== 0
          ? Math.round((1000 * (product.price - cost)) / cost) / 10
          : null

      await this.update({ id: productId }, { cost, profit })

      return product.groupId
    }

    return null
  }
}

export default ProductsRepository
