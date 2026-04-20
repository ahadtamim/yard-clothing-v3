import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Product Name', admin: { width: '60%' } },
        { name: 'price', type: 'number', required: true, label: 'Price (BDT)', admin: { width: '40%' } },
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
        { name: 'category', type: 'relationship', relationTo: 'categories', required: true, admin: { width: '50%' } },
        {
          name: 'sizes',
          type: 'select',
          hasMany: true,
          required: true,
          label: 'Available Sizes',
          options: [
            { label: 'S', value: 's' }, { label: 'M', value: 'm' }, { label: 'L', value: 'l' },
            { label: 'XL', value: 'xl' }, { label: 'XXL', value: 'xxl' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'productImages',
      label: 'Product Photos (Max 5)',
      type: 'array', // Everything stays on this one page
      minRows: 1,
      maxRows: 5,
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