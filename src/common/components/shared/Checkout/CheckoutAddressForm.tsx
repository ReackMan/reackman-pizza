'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { AddressInputNoSSR, ErrorText, FormTextarea, WhiteBlock } from '@/common'

type Props = {
  className?: string
}

export const CheckoutAddressForm = ({ className }: Props) => {
  const { control } = useFormContext()

  return (
    <WhiteBlock title={'3. Адрес доставки'} className={className}>
      <div className={'flex flex-col gap-5'}>
        <Controller
          control={control}
          name={'address'}
          render={({ field, fieldState }) => (
            <>
              <AddressInputNoSSR onChangeAction={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />

        <FormTextarea
          name={'comment'}
          className={'text-base'}
          placeholder={'Комментарий к заказу'}
          rows={5}
        />
      </div>
    </WhiteBlock>
  )
}
