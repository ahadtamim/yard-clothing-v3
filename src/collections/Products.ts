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
    { name: 'description', type: 'textarea', label: 'Product Description' },
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
      label: 'Product Photos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
      admin: {
        // THIS IS THE FIX:
        // isSortable removes the "Select a value" dropdown 
        // and provides a list UI with a bulk-selection grid.
        isSortable: true, 
        description: 'Click the "+" button to bulk select up to 5 photos from your library.',
      },
      // Better way to enforce the 5-image limit
      validate: (val) => {
        if (val && val.length > 5) {
          return 'You can only select a maximum of 5 images.'
        }
        return true
      },
    },
  ],
}