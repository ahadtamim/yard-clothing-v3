import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

// Core Collections
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Products } from './collections/Products'
import { Orders } from './collections/Orders'

// Global Configs
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins as existingPlugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Dynamic Server URL for Handshake/CORS
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
  // CRITICAL: Tells the frontend where to find the API
  serverURL: NEXT_PUBLIC_SERVER_URL,
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  
  collections: [
    Products, 
    Categories, 
    Orders, 
    Media, 
    Users
  ],

  globals: [
    Header, 
    Footer,
    {
      slug: 'site-settings',
      label: 'Site Settings',
      fields: [
        {
          name: 'logo',
          label: 'Website Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'siteName',
          label: 'Site Name',
          type: 'text',
          defaultValue: 'Yard Clothing',
        },
      ],
    },
    {
      slug: 'banner',
      label: 'Home Banner',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        { 
          name: 'bannerImage', 
          type: 'upload', 
          relationTo: 'media', 
          required: true 
        },
      ],
    },
  ],
  
  secret: process.env.PAYLOAD_SECRET || 'ccc6d422fd9be9c22cca735f',
  
  plugins: [
    // Move Vercel Blob to top to ensure it handles the logo upload properly
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