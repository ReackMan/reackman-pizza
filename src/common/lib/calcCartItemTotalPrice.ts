import { CartItemDTO } from '@/common'

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)

  return (ingredientsPrice + item.productVariation.price) * item.quantity
}
