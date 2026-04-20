// src/collections/Media.ts
import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  // HIDDEN: It’s now just a silent partner for product photos
  admin: {
    hidden: true, 
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // REQUIRED REMOVED: No longer required, keeps it simple
      required: false, 
      label: 'Description (Automatic - you can leave blank)',
    },
  ],
  upload: {
    // SIMPLIFIED: Save directly to public/media
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      // Keeps a clean 1:1 square ratio for product grid
      {
        name: 'productSquare',
        width: 1000,
        height: 1000,
        crop: 'center',
      },
    ],
  },
}