'use client'

import { CartStateItem, CreateCartItemValues } from '@/common'
import { useCartStore } from '@/appModel'
import { useEffect } from 'react'

type ReturnProps = {
  totalAmount: number
  items: CartStateItem[]
  loading: boolean
  updateItemQuantity: (id: number, quantity: number) => void
  removeCartItem: (id: number) => void
  addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore(state => state)

  useEffect(() => {
    cartState.fetchCartItems()
    // eslint-disable-next-line
  }, [])

  return cartState
}
