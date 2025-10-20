import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { CreateCartItemValues, findOrCreateCart, updateCartTotalAmount } from '@/common'
import { prisma } from '@/prisma/prismaClient'
import { CartItem } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] })
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productVariation: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    })

    return NextResponse.json(userCart)
  } catch (error) {
    console.error('[CART_GET] Server error', error)
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value

    if (!token) {
      token = crypto.randomUUID()
    }

    const userCart = await findOrCreateCart(token)

    const data = (await req.json()) as CreateCartItemValues

    const allCartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productVariationId: data.productVariationId,
      },
    })

    let findCartItem: CartItem | null = null

    for (const item of allCartItems) {
      findCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: userCart.id,
          id: item.id,
          ingredients: {
            every: {
              id: { in: data.ingredients },
            },
          },
        },
      })

      if (findCartItem) break
    }

    // Если товар был найден, делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariationId: data.productVariationId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map(id => ({ id })) },
        },
      })
    }

    const updatedUserCart = await updateCartTotalAmount(token)

    const resp = NextResponse.json(updatedUserCart)
    resp.cookies.set('cartToken', token)
    return resp
  } catch (error) {
    console.error('[CART_POST] Server error', error)
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 })
  }
}
