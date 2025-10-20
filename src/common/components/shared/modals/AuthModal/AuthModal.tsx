'use client'

import { Button, Dialog, DialogContent, LoginForm, RegisterForm } from '@/common'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'

type Props = {
  open: boolean
  onCloseAction: () => void
}

export const AuthModal = ({ open, onCloseAction }: Props) => {
  const [type, setType] = useState<'login' | 'register'>('login')

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login')
  }

  const handleClose = () => {
    onCloseAction()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={'w-[450px] bg-white p-10'}>
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <div className={'flex gap-2'}>
          <Button
            variant={'secondary'}
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type={'button'}
            className={'gap-2 h-12 p-2 flex-1'}
          >
            <Image
              width={24}
              height={24}
              alt={'favicon'}
              style={{ width: 24, height: 24 }}
              src={'https://github.githubassets.com/favicons/favicon.svg'}
            />
            GitHub
          </Button>

          <Button
            variant={'secondary'}
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type={'button'}
            className={'gap-2 h-12 p-2 flex-1'}
          >
            <Image
              width={24}
              height={24}
              alt={'productlogos'}
              style={{ width: 24, height: 24 }}
              src={'https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'}
            />
            Google
          </Button>
        </div>

        <Button variant={'outline'} onClick={onSwitchType} type={'button'} className={'h-12'}>
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
