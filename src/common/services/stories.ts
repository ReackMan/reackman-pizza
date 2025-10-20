import { instance } from '@/common'
import { Story, StoryItem } from '@prisma/client'

export type IStory = Story & {
  items: StoryItem[]
}

export const getAllStories = async () => {
  const { data } = await instance.get<IStory[]>('/stories')

  return data
}
