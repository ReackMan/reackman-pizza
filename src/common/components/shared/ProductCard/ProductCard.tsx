import { Button, cn, CountButton, Title } from '@/common'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  id: number
  name: string
  price: number
  count?: number
  imageUrl?: string
  className?: string
}

export const ProductCard = (props: Props) => {
  const { name, price, count, imageUrl, className, id } = props
  return (
    <div className={cn(className)}>
      <Link href={`/product/${id}`}>
        <div className={'flex justify-center p-6 bg-secondary rounded-lg h-[260px]'}>
          <Image
            src={`${imageUrl}`}
            style={{ width: 215, height: 215 }}
            alt={'Logo'}
            width={215}
            height={215}
          />
        </div>
        <Title text={name} size={'sm'} className={'mb-1 mt-3 font-bold'} />
        <p className={'text-sm text-gray-400'}>
          Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок
        </p>

        <div className={'flex justify-between items-center mt-4'}>
          <span className={'text-[20px]'}>
            от <b>{price} ₽</b>
          </span>

          {count ? (
            <CountButton value={count} size={'lg'} />
          ) : (
            <Button variant={'secondary'}>
              <Plus className={'w-4 h-4 mr-1'} />
              Добавить
            </Button>
          )}
        </div>
      </Link>
    </div>
  )
}
