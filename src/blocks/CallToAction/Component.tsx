import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<any> = ({ links, richText }) => {
  return (
    <div className="container">
      <div className="bg-card border border-border p-8 md:p-12 rounded-lg flex flex-col md:flex-row gap-8 justify-between items-center">
        <div className="max-w-[48rem]">
          {richText && <RichText data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-wrap gap-4">
          {(links || []).map(({ link }: { link: any }, i: number) => {
            return <CMSLink key={i} {...link} />
          })}
        </div>
      </div>
    </div>
  )
}

export default CallToActionBlock