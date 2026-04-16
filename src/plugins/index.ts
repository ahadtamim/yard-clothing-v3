import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<any> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Yard Clothing` : 'Yard Clothing'
}

const generateURL: GenerateURL<any> = ({ doc }) => {
  const url = getServerSideURL()
  // Updated to point to products specifically
  return doc?.slug ? `${url}/products/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    // We strictly limit this to products to prevent initialization crashes
    collections: ['products'] as any,
    overrides: {
      // Disabling admin fields if they reference missing collections
      admin: {
        group: 'Config',
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    // Explicitly define which collections get SEO fields
    collections: ['products'], 
    uploadsCollection: 'media',
  }),
  searchPlugin({
    collections: ['products'] as any,
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => [...defaultFields, ...searchFields],
    },
  }),
]