'use client'

import { useFormContext } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'
import { ClearButton, ErrorText, Input, RequiredSymbol } from '@/common'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label?: string
  required?: boolean
  className?: string
}

export const FormInput = (props: Props) => {
  const { className, name, label, required } = props
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true })
  }

  return (
    <div className={className}>
      {label && (
        <p className={'font-medium mb-2'}>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className={'relative'}>
        <Input className={'h-12 text-md'} {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className={'mt-2'} />}
    </div>
  )
}
