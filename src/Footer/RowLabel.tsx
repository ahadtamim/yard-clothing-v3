'use client'
import { Header } from '@/payload-types'
import { useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  // FIX: Using 'as any' here to prevent the build from failing 
  // while TypeScript reconciles the new Product/Category relations.
  const label = (data?.data?.link as any)?.label

  return (
    <div>
      {label
        ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${label}`
        : 'Row'}
    </div>
  )
}