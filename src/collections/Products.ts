import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'sizes'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Product Name',
          admin: { width: '60%' },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Price (BDT)',
          admin: { width: '40%' },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Product Description',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
          admin: { width: '50%' },
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
          admin: { width: '50%' },
        },
      ],
    },
    // --- SIMPLIFIED SINGLE-PAGE IMAGE UPLOAD ---
    {
      name: 'productImages',
      label: 'Product Photos',
      type: 'array', // This puts the list directly on the page
      minRows: 1,
      maxRows: 5,
      admin: {
        description: 'Add up to 5 images. These will upload directly to your store.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
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