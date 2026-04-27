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
      // Reverting to relationship for better list visibility
      type: 'relationship', 
      relationTo: 'media',
      hasMany: true,
      required: true,
      admin: {
        // isSortable triggers the list UI and allows reordering
        isSortable: true,
        description: 'Click "+" to manage photos. Selected images will appear here.',
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