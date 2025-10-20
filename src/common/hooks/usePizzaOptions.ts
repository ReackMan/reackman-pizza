'use client'

import { useSet } from 'react-use'
import { getAvailablePizzaSizes, PizzaPastry, PizzaSize, Variant } from '@/common'
import { ProductVariation } from '@prisma/client'
import { useEffect, useState } from 'react'

type ReturnProps = {
  size: PizzaSize
  pastry: PizzaPastry
  selectedIngredients: Set<number>
  availableSizes: Variant[]
  currentItemId?: number
  setSize: (size: PizzaSize) => void
  setPastry: (size: PizzaPastry) => void
  addIngredient: (id: number) => void
}

export const usePizzaOptions = (variations: ProductVariation[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20)
  const [pastry, setPastry] = useState<PizzaPastry>(1)
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))

  const availableSizes = getAvailablePizzaSizes(pastry, variations)

  const currentItemId = variations.find(item => item.pastry === pastry && item.size === size)?.id

  useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      item => Number(item.value) === size && !item.disabled
    )
    const availableSize = availableSizes?.find(item => !item.disabled)

    if (!isAvailableSize && availableSize) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [availableSizes, pastry, size])

  return {
    size,
    pastry,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setPastry,
    addIngredient,
  }
}
