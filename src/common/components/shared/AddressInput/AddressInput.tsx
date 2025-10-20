'use client'

import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

type Props = {
  onChangeAction?: (value?: string) => void
}

const AddressInput = ({ onChangeAction }: Props) => {
  return (
    <AddressSuggestions
      token={process.env.DADATA_API_KEY || ''}
      onChange={data => onChangeAction?.(data?.value)}
    />
  )
}
export default AddressInput
