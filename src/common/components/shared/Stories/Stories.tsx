'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ApiClient, cn, Container, IStory } from '@/common'

import { X } from 'lucide-react'
import ReactStories from 'react-insta-stories'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Autoplay, FreeMode, Mousewheel } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'

type Props = {
  className?: string
}

export const Stories = ({ className }: Props) => {
  const [stories, setStories] = useState<IStory[]>([])
  const [open, setOpen] = useState(false)
  const [selectedStory, setSelectedStory] = useState<IStory>()

  useEffect(() => {
    async function fetchStories() {
      const data = await ApiClient.stories.getAllStories()
      setStories(data)
    }

    fetchStories()
  }, [])

  const onClickStory = (story: IStory) => {
    setSelectedStory(story)

    if (story.items.length > 0) {
      setOpen(true)
    }
  }

  return (
    <>
      <Container className={cn('flex items-center justify-between gap-2 my-10', className)}>
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className={'w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse'}
            />
          ))}

        <Swiper
          modules={[Mousewheel, Autoplay, FreeMode]}
          loop={true}
          freeMode={true}
          mousewheel={true}
          slidesPerView={6}
          // centeredSlides={true} // центрировать активный слайд
          spaceBetween={20}
        >
          {stories.map(story => (
            <SwiperSlide key={story.id} style={{ width: '300px' }}>
              <Image
                key={story.id}
                onClick={() => onClickStory(story)}
                className={'rounded-md cursor-pointer'}
                style={{ width: 200, height: 250 }}
                height={250}
                width={200}
                src={story.previewImageUrl}
                alt={`Story ${story.id}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {open && (
          <div
            className={
              'absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30'
            }
          >
            <div className={'relative'} style={{ width: 520 }}>
              <button className={'absolute -right-10 -top-5 z-30'} onClick={() => setOpen(false)}>
                <X className={'absolute top-0 right-0 w-8 h-8 text-white/50'} />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={selectedStory?.items.map(item => ({ url: item.sourceUrl })) || []}
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
