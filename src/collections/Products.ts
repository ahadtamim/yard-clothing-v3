import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price (BDT)',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        hidden: true, // Hidden forever
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.name) {
              return data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }
            return value
          },
        ],
      },
    },
  ],
}