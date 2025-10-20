import { ProductVariation } from '@prisma/client'
import { pizzaSizes, PizzaPastry, Variant } from '@/common'

export const getAvailablePizzaSizes = (
  pastry: PizzaPastry,
  variations: ProductVariation[]
): Variant[] => {
  const filteredPizzasByType = variations.filter(item => item.pastry === pastry)

  return pizzaSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value)),
  }))
}
