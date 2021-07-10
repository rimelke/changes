import IProduct from './IProduct'
import IService from './IService'

export interface IServiceProduct {
  id: string
  serviceId: string
  productId: string
  amount: number
  unitValue: number
  totalValue: number
  createdAt: string
  updatedAt: string
  product: IProduct
}

interface IDetailedService extends IService {
  products: IServiceProduct[]
}

export default IDetailedService
