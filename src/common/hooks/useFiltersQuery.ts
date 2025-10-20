'use client'

import { useEffect, useRef } from 'react'
import { FiltersType } from '@/common'
import { useRouter } from 'next/navigation'
import qs from 'qs'

export const useFiltersQuery = (filters: FiltersType) => {
  const isMounted = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        pastry: Array.from(filters.pastry),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      }

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      })

      router.push(`?${query}`, {
        scroll: false,
      })
    }

    isMounted.current = true
  }, [filters, router])
}
