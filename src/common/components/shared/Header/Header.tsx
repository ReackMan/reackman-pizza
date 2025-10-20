'use client'

import Image from 'next/image'
import { AuthModal, CartButton, cn, Container, ProfileButton, SearchInput } from '@/common'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

type Props = {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header = ({ hasSearch = true, hasCart = true, className }: Props) => {
  const router = useRouter()
  const [openAuthModal, setOpenAuthModal] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    let toastMessage = ''

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!'
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/')
        toast.success(toastMessage, {
          duration: 3000,
        })
      }, 1000)
    }
  }, [router, searchParams])

  return (
    <header className={cn('border-b', className)}>
      <Container className={'flex items-center justify-between py-8'}>
        {/* Левая часть */}
        <Link href={'/'}>
          <div className={'flex items-center gap-4'}>
            <Image
              src={'/logo.png'}
              alt={'Logo'}
              width={35}
              height={35}
              style={{ width: 35, height: 35 }}
            />
            <div>
              <h1 className={'text-2xl uppercase font-black'}>Reack Pizza</h1>
              <p className={'text-sm text-gray-400 leading-3'}>вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className={'mx-10 flex-1'}>
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className={'flex items-center gap-3'}>
          <AuthModal open={openAuthModal} onCloseAction={() => setOpenAuthModal(false)} />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}
