import INeedlewoman from './INeedlewoman'

interface IService {
  id: string
  incrementId: number
  needlewomanId: string
  value: number
  amount: number
  deliveryDate: string | null
  withdrawalDate: string | null
  duration: number | null
  isPayed: boolean
  createdAt: string
  updatedAt: string
  needlewoman: INeedlewoman
}

export default IService
