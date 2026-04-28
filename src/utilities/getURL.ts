import canUseDOM from './canUseDOM'

/**
 * FIXED: Added getFullImageUrl to handle Vercel Blob storage.
 * This ensures product images and gallery thumbnails (View 2, 3, 4) 
 * load correctly instead of showing broken icons.
 */
export const getFullImageUrl = (url: string | any) => {
  // Extract the URL string if it's a Payload Media object, or use as is if it's a string
  const urlString = typeof url === 'string' ? url : url?.url

  if (!urlString) return '/placeholder.jpg'
  
  // 1. If it's already a full URL (external), return it immediately
  if (urlString.startsWith('http')) return urlString
  
  // 2. Point to your specific Vercel Blob storage domain
  const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
  
  // 3. Clean the path to avoid double slashes (e.g., //assets)
  const cleanPath = urlString.startsWith('/') ? urlString : `/${urlString}`
  
  return `${blobDomain}${cleanPath}`
}

export const getServerSideURL = () => {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  )
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}