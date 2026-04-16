import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
// FIX: Change this line to point to your local fields folder
import { slugField } from '@/fields/slug' 

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'parent', 'slug'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Main Category (e.g., Mens or Womens)',
      admin: {
        position: 'sidebar',
      },
    },
    // This helper usually takes the field name it's tracking
    slugField('title'), 
  ],
}