import { calcCartItemTotalPrice, CartDTO } from '@/common'

export type CartStateItem = {
  id: number
  quantity: number
  name: string
  imageUrl: string
  price: number
  disabled?: boolean
  pizzaSize?: number | null
  pastry?: number | null
  ingredients: Array<{ name: string; price: number }>
}

type ReturnProps = {
  items: CartStateItem[]
  totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map(item => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariation.product.name,
    imageUrl: item.productVariation.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productVariation.size,
    pastry: item.productVariation.pastry,
    disabled: false,
    ingredients: item.ingredients.map(ingredient => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[]

  return {
    items,
    totalAmount: data.totalAmount,
  }
}
