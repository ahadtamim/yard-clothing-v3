import type { GlobalConfig } from 'payload'

export const Banner: GlobalConfig = {
  slug: 'banner',
  label: 'Home Slideshow',
  access: {
    read: () => true, // Allows the website to see the banner
  },
  fields: [
    {
      name: 'bestProducts',
      label: 'Select Best Products (Max 5)',
      type: 'relationship',
      relationTo: 'products', // This links to your Products collection
      hasMany: true,
      minRows: 1,
      maxRows: 5, // Strict limit of 5 as requested
      required: true,
      admin: {
        description: 'These products will appear in the main homepage slideshow.',
      },
    },
  ],
}