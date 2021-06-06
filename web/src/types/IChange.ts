interface IChange {
  id: string
  referenceId: string
  description: string | null
  filename: string
  url: string
  createdAt: string
  updatedAt: string
}

export default IChange
