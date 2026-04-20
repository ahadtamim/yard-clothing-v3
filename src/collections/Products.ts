// src/collections/Products.ts
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    // Sets up the main product editing experience on one screen
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
    // ADDED: Product Description field
    {
      name: 'description',
      type: 'textarea', // Simple text area for description
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
        // ADDED: Size Dropdown field
        {
          name: 'sizes',
          type: 'select',
          hasMany: true, // Allow multiple sizes (M, L, XL)
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
    // --- FIXED MULTI-UPLOAD FIELD ---
    {
      name: 'productImages',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Upload Product Photos (Max 5)',
      admin: {
        description: 'Drag & Drop your photos. First photo is the main display.',
      },
      hasMany: true, // Crucial: Enables multi-select and bulk upload
      minRows: 1,
      maxRows: 5, // Limit to 5 as requested
    },
    // Slug remains hidden but automated
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        hidden: true, // You won't see this field
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