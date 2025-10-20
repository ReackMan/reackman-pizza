'use client'

import { Ingredient, ProductVariation } from '@prisma/client'
import {
  Button,
  cn,
  getPizzaDetails,
  IngredientItem,
  PizzaImage,
  pizzaPastries,
  PizzaPastry,
  PizzaSize,
  Title,
  usePizzaOptions,
  VariationsGroup,
} from '@/common'

type Props = {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  variations: ProductVariation[]
  loading?: boolean
  onSubmitAction: (itemId: number, ingredients: number[]) => void
  className?: string
}

/**
 * Форма выбора ПИЦЦЫ
 */
export const ChoosePizzaForm = ({
  name,
  variations,
  imageUrl,
  ingredients,
  loading,
  onSubmitAction,
  className,
}: Props) => {
  const {
    size,
    pastry,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setPastry,
    addIngredient,
  } = usePizzaOptions(variations)

  const { totalPrice, textDetails } = getPizzaDetails(
    pastry,
    size,
    variations,
    ingredients,
    selectedIngredients
  )

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmitAction(currentItemId, Array.from(selectedIngredients))
    }
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} alt={name} />

      <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
        <Title text={name} size={'md'} className={'font-extrabold mb-1'} />

        <p className={'text-gray-400'}>{textDetails}</p>

        <div className={'flex flex-col gap-4 mt-5'}>
          <VariationsGroup
            items={availableSizes}
            value={String(size)}
            onClickAction={value => setSize(Number(value) as PizzaSize)}
          />

          <VariationsGroup
            items={pizzaPastries}
            value={String(pastry)}
            onClickAction={value => setPastry(Number(value) as PizzaPastry)}
          />
        </div>

        <div className={'bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'}>
          <div className={'grid grid-cols-3 gap-3'}>
            {ingredients.map(ingredient => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
