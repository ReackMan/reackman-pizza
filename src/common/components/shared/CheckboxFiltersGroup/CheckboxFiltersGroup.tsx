'use client'

import { FilterCheckbox, Input, Props as FilterCheckboxProps, Skeleton } from '@/common'
import { ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'

type Item = FilterCheckboxProps

type Props = {
  title: string
  items: Item[]
  defaultItems?: Item[]
  limit?: number
  loading?: boolean
  searchInputPlaceholder?: string
  onClickCheckboxAction?: (id: string) => void
  defaultValue?: string[]
  selected?: Set<string>
  className?: string
  name?: string
}

export const CheckboxFiltersGroup = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  className,
  loading,
  onClickCheckboxAction,
  selected,
  name,
}: Props) => {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setShowAll(true)
    setSearchValue(e.target.value)
  }

  if (loading) {
    return (
      <div className={className}>
        <p className={'font-bold mb-3'}>{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className={'h-6 mb-4 rounded-[8px]'} />)}

        <Skeleton className={'w-28 h-6 mb-4 rounded-[8px]'} />
      </div>
    )
  }

  const list = showAll
    ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()))
    : (defaultItems || items).slice(0, limit)

  if (selected) {
    list.sort((a, b) => {
      const aSelected = selected.has(a.value)
      const bSelected = selected.has(b.value)

      if (aSelected && !bSelected) return -1
      if (!aSelected && bSelected) return 1
      return a.text.localeCompare(b.text)
    })
  }

  return (
    <div className={className}>
      <p className={'font-bold mb-3'}>{title}</p>

      <div className={'mb-5'}>
        <Input
          onChange={onChangeSearchInput}
          placeholder={searchInputPlaceholder}
          className={'bg-gray-50 border-none'}
        />
      </div>

      <motion.div layout className={'flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'}>
        {list.map((item, index) => (
          <motion.div layout key={index}>
            <FilterCheckbox
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              checked={selected?.has(item.value)}
              onCheckedChangeAction={() => onClickCheckboxAction?.(item.value)}
              name={name}
            />
          </motion.div>
        ))}
      </motion.div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className={'text-primary mt-3'}>
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}
