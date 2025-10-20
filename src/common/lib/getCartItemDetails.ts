import { PizzaSize, PizzaPastry, mapPizzaPastry, CartStateItem } from '@/common'

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  pizzaPastry?: PizzaPastry,
  pizzaSize?: PizzaSize
): string => {
  const details = []

  if (pizzaSize && pizzaPastry) {
    const typeName = mapPizzaPastry[pizzaPastry]
    details.push(`${typeName} ${pizzaSize} см`)
  }

  if (ingredients) {
    details.push(...ingredients.map(ingredient => ingredient.name))
  }

  return details.join(', ')
}
