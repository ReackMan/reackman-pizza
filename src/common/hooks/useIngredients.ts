'use client'

import { useEffect, useState } from 'react'
import { ApiClient } from '@/common'
import { Ingredient } from '@prisma/client'

type ReturnProps = {
  ingredients: Ingredient[]
  loading: boolean
}

export const useIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getIngredients() {
      try {
        setLoading(true)
        const ingredients = await ApiClient.ingredients.getAllIngredients()
        setIngredients(ingredients)
      } catch (error) {
        console.error('[Get Ingredients] Error:', error)
      } finally {
        setLoading(false)
      }
    }
    getIngredients()
  }, [])

  return {
    ingredients,
    loading,
  }
}
