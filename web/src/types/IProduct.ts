import IGroup from './IGroup'

interface IProduct {
  id: string
  ref: string
  groupId: string
  name: string
  cost: number
  price: number
  profit: number
  createdAt: string
  updatedAt: string
  group: IGroup
}

export default IProduct
