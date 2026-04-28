import canUseDOM from './canUseDOM'

/**
 * FINAL FIX: Exhaustive Image Extraction
 * Handles both simple strings and deeply nested Payload CMS Media objects.
 */
export const getFullImageUrl = (img: any) => {
  let urlString = '';

  if (typeof img === 'string') {
    // Case 1: img is just a string (ID or path)
    urlString = img;
  } else if (img?.url) {
    // Case 2: img is a Media object with a direct URL
    urlString = img.url;
  } else if (img?.image?.url) {
    // Case 3: img is a nested object where the media is under 'image'
    urlString = img.image.url;
  } else if (img?.image && typeof img.image === 'string') {
    // Case 4: image is a string inside an object
    urlString = img.image;
  }

  if (!urlString) return '/placeholder.jpg'
  
  // Return early if it's already an absolute URL
  if (urlString.startsWith('http')) return urlString
  
  // Point to your specific Vercel Blob storage domain
  const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
  
  // Ensure path starts with a single slash
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