import { calcTotalPizzaPrice, mapPizzaPastry, PizzaPastry, PizzaSize } from '@/common'
import { Ingredient, ProductVariation } from '@prisma/client'

export const getPizzaDetails = (
  pastry: PizzaPastry,
  size: PizzaSize,
  variations: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(pastry, size, variations, ingredients, selectedIngredients)
  const textDetails = `${size} см, ${mapPizzaPastry[pastry]} пицца`

  return { totalPrice, textDetails }
}
