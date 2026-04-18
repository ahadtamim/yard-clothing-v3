'use client'
import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

export const RowLabel: React.FC = () => {
  // We remove the <Type> entirely so TypeScript cannot check it
  const data = useRowLabel<any>()

  // We use a safe fallback for the label
  const label = data?.data?.link?.label || ''

  return (
    <div>
      {label ? `Nav item: ${label}` : 'Row'}
    </div>
  )
}