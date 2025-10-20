// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import {DefaultSession} from 'next-auth'
import {DefaultJWT} from 'next-auth/jwt'
import type {UserRole} from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      role: UserRole
    } & DefaultSession['user']
  }

  interface User {
    id: number
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  type JWT = DefaultJWT & {
    id: number
    role: UserRole
  }
}
