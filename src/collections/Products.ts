// src/collections/Products.ts
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    // We added productImages here so you can see them in the main table too
    defaultColumns: ['name', 'price', 'category', 'sizes', 'productImages'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Product Name (e.g., Blue Printed Kurta)',
          admin: {
            width: '60%',
          },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Price (BDT)',
          admin: {
            width: '40%',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Product Description',
      admin: {
        description: 'Detail of the product, fabric, styling, etc.',
      },
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
          hasMany: true,
          required: true,
          label: 'Available Sizes',
          options: [
            { label: 'S', value: 's' },
            { label: 'M', value: 'm' },
            { label: 'L', value: 'l' },
            { label: 'XL', value: 'xl' },
            { label: 'XXL', value: 'xxl' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'productImages',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Upload Product Photos (Max 5)',
      hasMany: true, // Allows multiple selection
      minRows: 1,
      maxRows: 5,
      admin: {
        description: 'Upload up to 5 photos. The first one is your main image.',
        // This ensures the images stay visible after the upload popup closes
        condition: (data) => true, 
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        hidden: true,
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