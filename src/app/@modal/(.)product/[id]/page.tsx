import { notFound } from 'next/navigation'
import { prisma } from '@/prisma/prismaClient'
import { ChooseProductModal } from '@/common'

type Props = { params: Promise<{ id: string }> }

export default async function ProductModalPage({ params }: Props) {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      variations: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return <ChooseProductModal product={product} />
}
