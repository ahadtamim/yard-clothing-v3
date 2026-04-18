import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'stock'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText', // Better for detailed product descriptions
      required: true,
    },
    {
      type: 'row', // Groups price and stock side-by-side in admin
      fields: [
        {
          name: 'price',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'stock',
          type: 'number',
          label: 'Inventory (How many left)',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'sizes',
          type: 'select',
          required: true,
          hasMany: true,
          options: [
            { label: 'Small (S)', value: 'S' },
            { label: 'Medium (M)', value: 'M' },
            { label: 'Large (L)', value: 'L' },
            { label: 'Extra Large (XL)', value: 'XL' },
            { label: 'Double Extra Large (XXL)', value: 'XXL' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product Images (Exactly 5 Photos)',
      minRows: 5,
      maxRows: 5,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}