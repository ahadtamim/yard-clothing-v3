import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

// @ts-ignore
import type { Post } from '../../../payload-types'

// @ts-ignore
export const revalidatePost: CollectionAfterChangeHook<any> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('posts-sitemap', '')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap', '')
    }
  }
  return doc
}

// @ts-ignore
export const revalidateDelete: CollectionAfterDeleteHook<any> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('posts-sitemap', '')
  }

  return doc
}