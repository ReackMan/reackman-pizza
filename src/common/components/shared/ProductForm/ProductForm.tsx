'use client'

import toast from 'react-hot-toast'
import { ChoosePizzaForm, ChooseProductForm, ProductWithRelations } from '@/common'
import { useCartStore } from '@/appModel'

type Props = {
  product: ProductWithRelations
  onSubmit?: VoidFunction
}

export const ProductForm = ({ product, onSubmit: _onSubmit }: Props) => {
  const addCartItem = useCartStore(state => state.addCartItem)
  const loading = useCartStore(state => state.loading)

  const firstItem = product.variations[0]
  const isPizzaForm = Boolean(firstItem.pastry)

  const onSubmit = async (productVariationId?: number, ingredients?: number[]) => {
    try {
      const itemId = productVariationId ?? firstItem.id

      await addCartItem({
        productVariationId: itemId,
        ingredients,
      })

      toast.success(product.name + ' добавлена в корзину')

      _onSubmit?.()
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину')
      console.error(err)
    }
  }

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variations={product.variations}
        onSubmitAction={onSubmit}
        loading={loading}
      />
    )
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  )
}
