import { Container, Filters, findPizzas, ProductsGroupList, Stories, Title, TopBar } from '@/common'

// eslint-disable-next-line
export default async function RootPage(props: any) {
  const { searchParams } = await props
  const categories = await findPizzas(searchParams)
  return (
    <>
      <Container className={'mt-10'}>
        <Title text={'Все пиццы'} size={'lg'} className={'font-extrabold'} />
      </Container>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />

      <Stories />

      <Container className={'mt-10 pb-14'}>
        <div className={'flex gap-[80px]'}>
          {/*  Фильтрация  */}
          <div className={'w-[250px]'}>
            <Filters />
          </div>

          {/*  Список товаров  */}
          <div className={'flex-1'}>
            <div className={'flex flex-col gap-16'}>
              {categories.map(
                category =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>

            <div className={'flex items-center gap-6 mt-12'}>
              <span className={'text-sm text-gray-400'}>5 из 65</span>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
