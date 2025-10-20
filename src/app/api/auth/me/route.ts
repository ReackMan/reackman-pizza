import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'
import { getUserSession } from '@/common'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getUserSession()

    if (!user) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 })
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('[Auth Me] Error:', error)
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 })
  }
}
