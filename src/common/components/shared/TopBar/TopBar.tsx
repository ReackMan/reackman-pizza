import { Categories, cn, Container, SortPopup } from '@/common'

type Props = {
  categories: { name: string }[]
  className?: string
}

export const TopBar = ({ className, categories }: Props) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className={'flex items-center justify-between'}>
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  )
}
