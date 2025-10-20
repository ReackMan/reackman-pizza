import { ApiRoutes, instance } from '@/common'
import { Ingredient } from '@prisma/client'

export const getAllIngredients = async () => {
  return (await instance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data
}
