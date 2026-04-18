// FIX: Commented out the broken import to satisfy the Vercel build
// import { Post } from '@/payload-types'

/**
 * Formats an array of populatedAuthors from Posts into a prettified string.
 * @param authors - The populatedAuthors array.
 * @returns A prettified string of authors.
 */
export const formatAuthors = (authors: any[]) => {
  // Ensure we don't have any authors without a name and handle potential undefined
  const authorNames = (authors || [])
    .map((author) => (typeof author === 'object' ? author?.name : null))
    .filter(Boolean)

  if (authorNames.length === 0) return ''
  if (authorNames.length === 1) return authorNames[0]
  if (authorNames.length === 2) return `${authorNames[0]} and ${authorNames[1]}`

  return `${authorNames.slice(0, -1).join(', ')} and ${authorNames[authorNames.length - 1]}`
}