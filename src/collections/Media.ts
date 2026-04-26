import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // In Payload 3.0, 'staticURL' is removed. 
    // The URL is handled automatically or via the 'adminThumbnail' strategy.
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
    // This allows the "Upload" modal to accept multiple files from your PC at once
    upload: {
      collections: {
        media: {
          allowMultiSelect: true,
        },
      },
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}