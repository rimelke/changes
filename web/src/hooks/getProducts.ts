import { useState } from 'react'
import IProduct from '../types/IProduct'
import { useGet } from './useGet'

interface IGetProductsData {
  total: number
  data: IProduct[]
}

interface Params {
  groupId?: string | null
  search?: string | null
}

const getProducts = ({ groupId, search }: Params = {}) => {
  const [page, setPage] = useState(0)
  const [amount, setAmount] = useState(25)

  function getUrl() {
    let url = `/products?take=${amount}&skip=${page * amount}`

    if (groupId) url += `&groupId=${groupId}`

    if (search) url += `&search=${search}`

    return url
  }

  const { data, error, mutate } = useGet<IGetProductsData>(getUrl())

  function nextPage() {
    if (data) {
      if (page < data.total - 1) setPage(page + 1)
    }
  }

  function prevPage() {
    if (page > 0) setPage(page - 1)
  }

  return {
    data: data?.data,
    error,
    mutate,
    nextPage,
    prevPage,
    page,
    totalPages: data ? Math.ceil(data.total / amount) : undefined,
    setAmount
  }
}

export default getProducts
