import { cn, CountButton } from '@/common'
import Image from 'next/image'

type Props = {
  imageUrl?: string
  name?: string
  price?: number
  className?: string
  count?: number
}

export const CartItem = (props: Props) => {
  const { imageUrl, name, price, count, className } = props
  return (
    <div className={cn('flex bg-white h-36 p-5 gap-6', className)}>
      <Image
        src={imageUrl || ''}
        alt={'Logo'}
        style={{ width: 65, height: 65 }}
        width={65}
        height={65}
      />

      <div>
        <h2 className={'text-lg font-bold'}>{name}</h2>
        <p className={'text-sm text-gray-400'}>Средняя 30 см, традиционное тесто</p>
        <hr className={'my-3'} />

        <div className={'flex items-center justify-between'}>
          <CountButton value={count} />

          <h2 className={'font-bold'}>{price} ₽</h2>
        </div>
      </div>
    </div>
  )
}
