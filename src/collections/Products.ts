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
      type: 'relationship', // Changed from 'array' to 'relationship'
      relationTo: 'media',  // Points to media collection
      hasMany: true,        // Allows selecting multiple images at once
      minRows: 1,           // Note: minRows/maxRows work for relationships in modern Payload
      maxRows: 5,
      required: true,
      admin: {
        description: 'Click to select up to 5 photos. You can check multiple boxes in the media library.',
      },
    },
  ],
}