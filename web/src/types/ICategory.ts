interface ICategory {
  id: string
  name: string
  type: 'INCOME' | 'EXPENSE'
  createdAt: string
  updatedAt: string
}

export default ICategory
