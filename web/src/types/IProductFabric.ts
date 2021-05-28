import IFabric from './IFabric'

interface IProductFabric {
  id: string
  productId: string
  fabricId: string
  efficiency: number
  finalPrice: number
  subtotal: number
  createdAt: string
  updatedAt: string
  fabric: IFabric
}

export default IProductFabric
