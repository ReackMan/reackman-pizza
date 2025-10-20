'use client'

import dynamic from 'next/dynamic'

export const AddressInputNoSSR = dynamic(() => import('./AddressInput'), { ssr: false })
