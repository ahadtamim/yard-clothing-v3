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
      label: 'Product Photos',
      // Using 'upload' is the ONLY way to get the native multi-file picker
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      admin: {
        // We set this to true so the browser's file picker allows 
        // selecting multiple files at once.
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