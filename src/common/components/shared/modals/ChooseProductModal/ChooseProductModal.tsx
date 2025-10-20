'use client'

import { useRouter } from 'next/navigation'
import { cn, Dialog, DialogContent, ProductForm, ProductWithRelations } from '@/common'

type Props = {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter()

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  )
}
