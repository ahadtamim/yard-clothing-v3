import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
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
import { plugins } from './plugins'
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
  
  // Only the essentials for your store
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
        { name: 'bannerImage', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
  
  secret: process.env.PAYLOAD_SECRET || 'ccc6d422fd9be9c22cca735f',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  
  plugins, // CHECK STEP 2 BELOW TO FIX THIS
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})