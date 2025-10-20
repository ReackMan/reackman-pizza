import { prisma } from '@/prisma/prismaClient'

export type GetSearchParams = {
  query?: string
  sortBy?: string
  sizes?: string
  pastry?: string
  ingredients?: string
  priceFrom?: string
  priceTo?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async (params: GetSearchParams) => {
  const { sizes, pastry, priceTo, priceFrom, ingredients } = (await params) || {}
  const sizesArr = sizes?.split(',').map(Number)
  const pastryArr = pastry?.split(',').map(Number)
  const ingredientsIdArr = ingredients?.split(',').map(Number)

  const minPrice = Number(priceFrom) || DEFAULT_MIN_PRICE
  const maxPrice = Number(priceTo) || DEFAULT_MAX_PRICE

  return prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : undefined,
          variations: {
            some: {
              size: {
                in: sizesArr,
              },
              pastry: {
                in: pastryArr,
              },
              price: {
                gte: minPrice, // >=
                lte: maxPrice, // <=
              },
            },
          },
        },
        include: {
          ingredients: true,
          variations: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  })
}
