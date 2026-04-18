import React from 'react'

// FIX: Importing as namespace to bypass "no exported member" error
import * as PayloadTypes from '@/payload-types'

import RichText from '@/components/RichText'

// Using any to bypass the strict Page['hero'] requirement during initial build
type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | {
      children?: never
      richText?: any
    }

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}