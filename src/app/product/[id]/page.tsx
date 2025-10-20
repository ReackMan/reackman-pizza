import { notFound } from 'next/navigation'
import { prisma } from '@/prisma/prismaClient'
import { Container, ProductForm } from '@/common'

// export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
// eslint-disable-next-line
export default async function ProductPage(props: any) {
  const {
    params: { id },
  } = await props
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variations: true,
            },
          },
        },
      },
      variations: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return (
    <Container className={'flex flex-col my-10'}>
      <ProductForm product={product} />
    </Container>
  )
}
