import { EntityRepository, Repository } from 'typeorm'
import ProductFabrics from '../entities/ProductFabrics'

@EntityRepository(ProductFabrics)
class ProductFabricsRepository extends Repository<ProductFabrics> {}

export default ProductFabricsRepository
