'use client'
import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

export const RowLabel: React.FC = () => {
  const data = useRowLabel<any>()
  const label = data?.data?.link?.label || ''

  return (
    <div>
      {label ? `Nav item: ${label}` : 'Row'}
    </div>
  )
}