import { instance } from '@/common'
import { User } from '@prisma/client'

export const getMe = async () => {
  const { data } = await instance.get<User>('/auth/me')

  return data
}
