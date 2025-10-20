import Image from 'next/image'

type Props = {
  src: string
  className?: string
}

export const CartItemDetailsImage = ({ src, className }: Props) => {
  return (
    <Image
      className={className}
      style={{ width: 60, height: 60 }}
      src={src}
      width={60}
      height={60}
      alt={'alt'}
    />
  )
}
