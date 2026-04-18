import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

// Core Collections
import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Orders } from './collections/Orders'
import { Media } from './collections/Media'

import { defaultLexical } from '@/fields/defaultLexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: '- Yard Clothing Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    // This helps hide versions/drafts if they appear
    components: {}, 
  },
  serverURL: NEXT_PUBLIC_SERVER_URL,
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  
  // Requirement: ONLY these 5. Redirects/Search removed from here.
  collections: [
    Users,
    Categories,
    Products,
    Orders,
    Media,
  ],

  globals: [
    {
      slug: 'banner',
      label: 'Home Banner Slider',
      fields: [
        {
          name: 'bestProducts',
          label: 'Select 5 Products for Slideshow',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
          minRows: 1,
          maxRows: 5,
          required: true,
          admin: {
            description: 'Choose up to 5 products. Only their photos will show in the slider.',
          },
        },
      ],
    },
  ],
  
  secret: process.env.PAYLOAD_SECRET || 'ccc6d422fd9be9c22cca735f',
  
  plugins: [
    // We only keep the storage plugin. 
    // We REMOVE ...existingPlugins to kill Search and Redirects.
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN as string,
    }),
  ], 
  
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})