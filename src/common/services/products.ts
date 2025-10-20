import { instance } from './baseApi'
import { Product } from '@prisma/client'
import { ApiRoutes } from '@/common'

export const search = async (query: string) => {
  return (await instance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } })).data
}
