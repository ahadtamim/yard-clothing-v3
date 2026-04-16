import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
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
  collections: ['products' as any], 
  overrides: {
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        // This ensures the 'doc' relationship only looks at products
        if ('name' in field && field.name === 'doc') {
          return {
            ...field,
            relationTo: ['products' as any],
          }
        }
        return field
      })
    },
    hooks: {
      afterChange: [revalidateRedirects],
    },
  },
}),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: { payment: false },
    formOverrides: {
      fields: ({ defaultFields }) => defaultFields,
    },
  }),
  searchPlugin({
    // CRITICAL FIX: Search only products
    collections: ['products' as any],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => [...defaultFields, ...searchFields],
    },
  }),
]