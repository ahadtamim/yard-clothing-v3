import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

// Core Collections (Requirement 1, 2, 3, 4)
import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Orders } from './collections/Orders'
import { Media } from './collections/Media'

// Configuration Helpers
import { plugins as existingPlugins } from './plugins'
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
  },
  serverURL: NEXT_PUBLIC_SERVER_URL,
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  
  // Requirement: ONLY these collections. Nothing else.
  collections: [
    Users,       // Requirement 1: You & Partners
    Categories,  // Requirement 2: Men/Women/Types
    Products,    // Requirement 3: 5 Pics, Sizes, Inventory
    Orders,      // Requirement 4: Receipts & Sales
    Media,       // Necessary for Product/Banner images
  ],

  globals: [
    // Requirement 5: Banner Slideshow (Max 5 products)
    {
      slug: 'banner',
      label: 'Home Banner Slider',
      fields: [
        {
          name: 'bestProducts',
          label: 'Slider Products (Max 5)',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
          maxRows: 5,
          required: true,
        },
      ],
    },
  ],
  
  secret: process.env.PAYLOAD_SECRET || 'ccc6d422fd9be9c22cca735f',
  
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN as string,
    }),
    ...existingPlugins,
  ], 
  
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})