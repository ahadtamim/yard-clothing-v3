import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false, // THIS MUST BE FALSE TO STOP THE 500 ERROR
      admin: {
        hidden: true,
      },
    },
  ],
  upload: true, 
}