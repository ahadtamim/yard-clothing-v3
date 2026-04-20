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
    {
      name: 'productImages',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Product Photos (Max 5)',
      hasMany: true, 
      minRows: 1,
      maxRows: 5,
      admin: {
        // This helps the UI realize it needs to show the list immediately
        isSortable: true, 
        description: 'Upload 1-5 photos. They will appear here after you hit Save in the popup.',
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