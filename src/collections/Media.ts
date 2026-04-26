import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    hidden: true, // Keep it off the sidebar
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // CRITICAL FIX: This must be false or the upload fails
      required: false, 
      admin: {
        hidden: true, // Hide it so you don't have to see it
      },
    },
  ],
  upload: true, // Keeps the Vercel Blob connection active
}