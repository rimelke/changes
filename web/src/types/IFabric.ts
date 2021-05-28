import IProvider from './IProvider'

interface IFabric {
  id: string
  providerId: string
  name: string
  grammage: number
  width: number
  price: number
  finalPrice: number
  createdAt: string
  updatedAt: string
  provider: IProvider
}

export default IFabric
