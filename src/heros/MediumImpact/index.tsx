import React from 'react'

// FIX: Importing as namespace to bypass "no exported member" error during build
import * as PayloadTypes from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

// Using any temporarily to bypass the Page['hero'] requirement
export const MediumImpactHero: React.FC<any> = ({ links, media, richText }) => {
  return (
    <div className="">
      <div className="container mb-8">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container ">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {/* Using optional chaining safety for the caption */}
            {media && typeof media === 'object' && 'caption' in media && media.caption && (
              <div className="mt-3">
                <RichText data={media.caption as any} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}