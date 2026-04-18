import type React from 'react'
// @ts-ignore
import type { Page, Post } from '@/payload-types'
import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url?: string
  document?: any
}

export const PayloadRedirects: React.FC<Props> = (props) => {
  const { disableNotFound, url, document } = props

  // Logic moved INSIDE the component
  const redirectUrl = url || (document as any)?.slug

  if (redirectUrl) {
    redirect(redirectUrl)
  }

  if (!disableNotFound) {
    notFound()
  }

  return null
}