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
    // This property helps some browser environments enable the "multiple" attribute
    // on the hidden file input used by the admin panel.
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false, // Keep this false so it doesn't block bulk uploads
    },
  ],
}