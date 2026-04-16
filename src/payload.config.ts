import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob' // 1. Import the adapter
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
import { plugins as existingPlugins } from './plugins' // Renamed to avoid conflict
import { defaultLexical } from '@/fields/defaultLexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
  
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  
  // 2. Merge existing plugins with Vercel Blob Storage
  plugins: [
    ...existingPlugins,
    vercelBlobStorage({
      enabled: true, // Set to false if you want to use local disk during dev
      collections: {
        [Media.slug]: true, // This dynamically uses your Media collection slug
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ], 
  
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})