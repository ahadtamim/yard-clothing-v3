import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '../../components/Media'

export const MediaBlock: React.FC<any> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    position = 'default',
    staticImage,
  } = props

  return (
    <div
      className={cn(
        '',
        {
          container: position === 'default' && enableGutter,
        },
        className,
      )}
    >
      {position === 'fullscreen' && (
        <div className="relative">
          <Media resource={media} src={staticImage} />
        </div>
      )}
      {position === 'default' && (
        <Media imgClassName={cn('rounded', imgClassName)} resource={media} src={staticImage} />
      )}
      {media && typeof media === 'object' && media.caption && (
        <div
          className={cn('mt-6', {
            container: position === 'fullscreen' && enableGutter,
          }, captionClassName)}
        >
          <RichText data={media.caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}

export default MediaBlock