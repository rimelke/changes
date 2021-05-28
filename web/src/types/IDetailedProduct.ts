import IProduct from './IProduct'
import ICost from './ICost'
import IProductFabric from './IProductFabric'

interface IDetailedProduct extends IProduct {
  costs: ICost[]
  fabrics: IProductFabric[]
}

export default IDetailedProduct
