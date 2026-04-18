import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  /* DIRECTIONS: 
     1. Go to Vercel Dashboard > Storage > Blob.
     2. Upload your logo file.
     3. Copy the 'Read-only' URL and paste it below.
  */
  const LOGO_BLOB_URL = "https://ZJxIyg6t5n64Z1cJ.public.blob.vercel-storage.com/logo.png" 

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        alt="Yard Clothing Logo"
        width={34}
        height={34}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="h-[34px] w-auto object-contain"
        src={LOGO_BLOB_URL}
      />
      <span className="text-white font-bold text-xl tracking-tight uppercase">
        Yard Clothing
      </span>
    </div>
  )
}