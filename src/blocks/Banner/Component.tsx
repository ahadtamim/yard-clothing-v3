import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

export const BannerBlock: React.FC<any> = ({ className, content, type }) => {
  return (
    <div className={cn('mx-auto my-8 w-full max-w-[48rem]', className)}>
      <div className={cn('border py-3 px-6 rounded', {
        'bg-blue-100 border-blue-200': type === 'info',
        'bg-green-100 border-green-200': type === 'success',
        'bg-yellow-100 border-yellow-200': type === 'warning',
        'bg-red-100 border-red-200': type === 'error',
      })}>
        <RichText content={content} enableGutter={false} />
      </div>
    </div>
  )
}

export default BannerBlock