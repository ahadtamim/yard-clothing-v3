import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    hidden: true, // Keep it out of the sidebar
  },
  upload: true, // Keeps the Vercel connection active
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false, // This prevents the 500 "Required Field Missing" error
      admin: {
        hidden: true, // You will never see this box again
      },
    },
  ],
}