'use client'
import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

export const RowLabel: React.FC = () => {
  // 1. Change the generic to <any> so TypeScript stops checking the structure
  const data = useRowLabel<any>()

  // 2. Use optional chaining on everything to ensure it's safe
  const label = data?.data?.link?.label

  return (
    <div>
      {label
        ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${label}`
        : 'Row'}
    </div>
  )
}