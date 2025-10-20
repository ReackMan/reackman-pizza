'use client'

import { ProductCard, Title } from '@/common'
import { RefObject, useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { useCategoryStore } from '@/appModel'
import { Product } from '@prisma/client'

type Props = {
  title: string
  items: Product[]
  className?: string
  categoryId: number
}

export const ProductsGroupList = (props: Props) => {
  const { title, items, className, categoryId } = props

  const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
  const intersectionRef = useRef<HTMLDivElement | null>(null)
  const intersection = useIntersection(intersectionRef as RefObject<HTMLDivElement>, {
    threshold: 0.4,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size={'lg'} className={'font-extrabold mb-5'} />
      <div className={'grid grid-cols-3 gap-[50px]'}>
        {items.map(item => (
          <ProductCard
            key={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={390}
            id={item.id}
          />
        ))}
      </div>
    </div>
  )
}
