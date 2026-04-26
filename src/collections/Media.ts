import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  admin: {
    // This allows the "Upload" modal to accept more than one file at a time
    upload: {
      collections: {
        media: {
          allowMultiSelect: true, 
        }
      }
    }
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}