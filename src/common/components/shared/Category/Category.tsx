import Link from 'next/link'
import { cn } from '@/common'

type Props = {
  className?: string
  name: string
  activeIndex: number
  id: number
}

export const Category = ({ activeIndex, id, name }: Props) => {
  return (
    <Link
      className={cn(
        'flex items-center font-bold h-11 rounded-2xl px-5',
        activeIndex === id && 'bg-white shadow-md shadow-gray-200 text-primary'
      )}
      href={`/#${name}`}
    >
      <button>{name}</button>
    </Link>
  )
}
