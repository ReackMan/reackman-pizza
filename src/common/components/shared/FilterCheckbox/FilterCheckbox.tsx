'use client'

import { Checkbox } from '@/common'
import { ReactNode } from 'react'

export type Props = {
  text: string
  value: string
  endAdornment?: ReactNode
  onCheckedChangeAction?: (checked: boolean) => void
  checked?: boolean
  name?: string
}

export const FilterCheckbox = ({
  text,
  value,
  endAdornment,
  onCheckedChangeAction,
  checked,
  name,
}: Props) => {
  return (
    <div className={'flex items-center space-x-2'}>
      <Checkbox
        onCheckedChange={onCheckedChangeAction}
        checked={checked}
        value={value}
        className={'rounded-[8px] w-6 h-6'}
        id={`checkbox-${String(name)}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}`}
        className={'leading-none cursor-pointer flex-1'}
      >
        {text}
      </label>
      {endAdornment}
    </div>
  )
}
