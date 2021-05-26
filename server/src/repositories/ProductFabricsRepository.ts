import { EntityRepository, getCustomRepository, Repository } from 'typeorm'
import ProductFabrics from '../entities/ProductFabrics'
import FabricsRepository from './FabricsRepository'

@EntityRepository(ProductFabrics)
class ProductFabricsRepository extends Repository<ProductFabrics> {
  async updateFinalPriceAndSubtotals(fabricId: string) {
    const fabricsRepository = getCustomRepository(FabricsRepository)

    const fabric = await fabricsRepository.findOne(fabricId)

    console.log(this)

    if (fabric) {
      const productFabrics = await this.find({
        where: { fabricId }
      })

      return Promise.all(
        productFabrics.map(async (productFabric) => {
          await this.update(
            { id: productFabric.id },
            {
              finalPrice: fabric.finalPrice,
              subtotal:
                Math.round(100 * fabric.finalPrice * productFabric.efficiency) /
                100
            }
          )

          return productFabric.productId
        })
      )
    }

    return []
  }
}

export default ProductFabricsRepository
