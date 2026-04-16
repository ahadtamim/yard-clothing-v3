import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    // This makes the title in your browser tab feel like Django Admin
    meta: {
      titleSuffix: '- Yard Clothing Admin',
    },
    components: {
      // PRO TIP: If you want a clean "Django" feel, you can comment these out 
      // to remove the default Payload welcome screens.
      // beforeLogin: ['@/components/BeforeLogin'],
      // beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: defaultLexical,
  db: mongooseAdapter({
    // Explicitly fallback to an empty string to prevent build crashes
    url: process.env.DATABASE_URL || '',
  }),
  // This is your 'INSTALLED_APPS' or 'Admin Models' list
  collections: [Pages, Posts, Media, Categories, Users],
  globals: [Header, Footer],
  
  // Security & Environment settings
  secret: process.env.PAYLOAD_SECRET || 'ccc6d422fd9be9c22cca735f',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  
  plugins,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})