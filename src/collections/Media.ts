import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
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
  fields: [
    {
      name: 'alt',
      type: 'text',
      // Changing required to false allows you to save images 
      // quickly without typing an Alt tag every time.
      required: false, 
      label: 'Alt Text (Optional)',
      admin: {
        description: 'Describe the image for SEO and accessibility.',
      },
    },
  ],
}