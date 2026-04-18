import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<any> = (props) => {
  const { columns } = props

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col: any, index: number) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn('col-span-4', {
                  'lg:col-span-12': size === 'full',
                  'lg:col-span-8': size === 'twoThirds',
                  'lg:col-span-6': size === 'half',
                  'lg:col-span-4': size === 'oneThird',
                })}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}
                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ContentBlock