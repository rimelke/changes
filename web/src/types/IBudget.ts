import ICategory from './ICategory'

interface IBudget {
  id: string
  categoryId: string
  description: string
  value: number
  date: string
  createdAt: string
  updatedAt: string
  category: ICategory
}

export default IBudget
