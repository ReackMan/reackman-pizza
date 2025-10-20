'use client'

import { Category, cn } from '@/common'
import { useCategoryStore } from '@/appModel'

type Props = {
  items: { name: string }[]
  className?: string
}

export const Categories = ({ items }: Props) => {
  const categoryActiveId = useCategoryStore(state => state.activeId)
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl')}>
      {items.map(({ name }, index) => (
        <Category key={index} name={name} activeIndex={categoryActiveId - 1} id={index} />
      ))}
    </div>
  )
}
