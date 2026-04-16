import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    create: () => true, // Customers can create orders
    read: authenticated, // Only admin can see orders
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['id', 'customerName', 'total', 'createdAt'],
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { 
          name: 'product', 
          type: 'relationship', 
          // Use 'as any' here to prevent the TypeScript "not assignable" error 
          // during the Vercel build process.
          relationTo: 'products' as any, 
          required: true 
        },
        { 
          name: 'selectedSize', 
          type: 'text' 
        },
        { 
          name: 'quantity', 
          type: 'number', 
          defaultValue: 1 
        },
      ],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'bKash', value: 'bkash' },
        { label: 'Nagad', value: 'nagad' },
        { label: 'Cash on Delivery', value: 'cod' },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
  ],
}