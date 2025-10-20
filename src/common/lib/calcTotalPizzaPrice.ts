import { PizzaPastry, PizzaSize } from '@/common'
import { Ingredient, ProductVariation } from '@prisma/client'

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param pastry - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param variations - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общую стоимость
 */
export const calcTotalPizzaPrice = (
  pastry: PizzaPastry,
  size: PizzaSize,
  variations: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    variations.find(item => item.pastry === pastry && item.size === size)?.price || 0

  const totalIngredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)

  return pizzaPrice + totalIngredientsPrice
}
