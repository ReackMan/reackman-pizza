'use client'

import { useSearchParams } from 'next/navigation'
import { useSet } from 'react-use'
import { useMemo, useState } from 'react'

type PriceProps = {
  priceFrom?: number
  priceTo?: number
}

type QueryFilters = PriceProps & {
  pastry: string
  sizes: string
  ingredients: string
}

export type FiltersType = {
  sizes: Set<string>
  pastry: Set<string>
  selectedIngredients: Set<string>
  prices: PriceProps
}

type ReturnProps = FiltersType & {
  setPrices: (name: keyof PriceProps, value: number) => void
  setPastry: (value: string) => void
  setSizes: (value: string) => void
  setSelectedIngredients: (value: string) => void
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  )

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [])
  )

  const [pastry, { toggle: togglepastry }] = useSet(
    new Set<string>(searchParams.has('pastry') ? searchParams.get('pastry')?.split(',') : [])
  )

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  })

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return useMemo(
    () => ({
      sizes,
      pastry,
      selectedIngredients,
      prices,
      setPrices: updatePrice,
      setPastry: togglepastry,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [sizes, pastry, selectedIngredients, prices, togglepastry, toggleSizes, toggleIngredients]
  )
}
