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
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    // CHANGED: Sizes is now an array to track inventory per size
    {
      name: 'inventory',
      label: 'Sizes & Stock Levels',
      type: 'array',
      required: true,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'size',
              type: 'select',
              options: [
                { label: 'S', value: 's' },
                { label: 'M', value: 'm' },
                { label: 'L', value: 'l' },
                { label: 'XL', value: 'xl' },
                { label: 'XXL', value: 'xxl' },
                { label: 'Unstitched', value: 'unstitched' },
              ],
              admin: { width: '50%' },
            },
            {
              name: 'stock',
              type: 'number',
              label: 'Stock Quantity',
              required: true,
              defaultValue: 0,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    {
      name: 'productImages',
      label: 'Product Photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      admin: {
        description: 'You can select up to 5 photos from your computer at once.',
      },
      validate: (val) => {
        if (val && Array.isArray(val) && val.length > 5) {
          return 'You can only select a maximum of 5 images.'
        }
        return true
      },
    },
  ],
}