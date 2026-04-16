import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<any> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Yard Clothing` : 'Yard Clothing'
}

const generateURL: GenerateURL<any> = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/products/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    // We EXPLICITLY set collections to only products
    collections: ['products' as any],
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  searchPlugin({
    // We EXPLICITLY set collections to only products
    collections: ['products' as any],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => [...defaultFields, ...searchFields],
    },
  }),
]