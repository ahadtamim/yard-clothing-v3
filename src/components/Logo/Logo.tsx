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

  // Your Vercel Blob URL
  const LOGO_URL = "https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com/Logo/Black%20and%20White%20Yoga%20Studio%20Logo%20%281%29.jpg.jpeg"

  return (
    <div className={clsx('flex items-center', className)}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        alt="Yard Clothing Logo"
        width={150} 
        height={150}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="h-16 w-auto object-contain" 
        src={LOGO_URL}
      />
    </div>
  )
}