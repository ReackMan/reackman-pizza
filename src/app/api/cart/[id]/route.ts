import { prisma } from '@/prisma/prismaClient'
import { updateCartTotalAmount } from '@/common'
import { NextRequest, NextResponse } from 'next/server'

// --- Attempts to find typing for params in PATCH and DELETE ---
// export interface RouteHandlerContext<TParams extends Record<string, string>> {
//   params: TParams
//   // другие поля по необходимости
// }
//
// type Params = {
//   params: { id: string }
// }

export async function PATCH(
  req: NextRequest,
  // { params }: Params
  // eslint-disable-next-line
  context: any
): Promise<NextResponse> {
  try {
    const id = Number(context.params.id)
    const data = (await req.json()) as { quantity: number }
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' })
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token)

    return NextResponse.json(updatedUserCart)
  } catch (error) {
    console.error('[CART_PATCH] Server error', error)
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  // { params }: Params
  // eslint-disable-next-line
  context: any
): Promise<NextResponse> {
  try {
    const id = Number(context.params.id)
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' })
    }

    await prisma.cartItem.delete({
      where: {
        id: id,
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token)

    return NextResponse.json(updatedUserCart)
  } catch (error) {
    console.error('[CART_DELETE] Server error', error)
    return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 })
  }
}
