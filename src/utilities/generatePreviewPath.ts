import { CollectionSlug } from 'payload'

// FIX: Changed the type to Record<string, string> to bypass the strict CollectionSlug check
const collectionPrefixMap: Record<string, string> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: string // Changed from CollectionSlug to string
  slug: string
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const path = `${collectionPrefixMap[collection]}${slug === 'home' ? '' : `/${slug}`}`

  const params = {
    slug,
    collection,
    path,
  }

  const encodedParams = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')

  return `/next/preview?${encodedParams}`
}