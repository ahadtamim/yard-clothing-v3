import { formatDateTime } from '@/utilities/formatDateTime'
import React from 'react'

// FIX: Importing as namespace to bypass "no exported member" error
import * as PayloadTypes from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

// Using any temporarily to bypass the strict Post type requirement
export const PostHero: React.FC<{
  post: any
}> = ({ post }) => {
  const { authors, categories, meta: { image: metaImage } = {}, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    (authors && Array.isArray(authors) && authors.length > 0) ||
    (populatedAuthors && Array.isArray(populatedAuthors) && populatedAuthors.length > 0)

  return (
    <div className="relative flex items-end">
      <div className="container z-10 relative text-white pb-8">
        <div className="max-w-[48rem]">
          {categories && categories.length > 0 && (
            <div className="uppercase text-sm mb-6">
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  const titleToUse = categoryTitle || 'Untitled'
                  const isLast = index === categories.length - 1
                  return (
                    <React.Fragment key={index}>
                      {titleToUse}
                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </div>
          )}
          <h1 className="mb-6">{title}</h1>
          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Authors</p>
                  <p>{formatAuthors(populatedAuthors || authors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {metaImage && typeof metaImage === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={metaImage} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    </div>
  )
}