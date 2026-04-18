import type { CollectionConfig } from 'payload'
import { ExportButton } from '../components/ExportButton' // We will create this next

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderID',
    description: 'Manage customer orders and download monthly sales reports.',
  },
  fields: [
    {
      name: 'exportOrders',
      type: 'ui',
      admin: {
        components: {
          Field: ExportButton,
        },
        position: 'sidebar',
      },
    },
    {
      name: 'orderID',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products' },
        { name: 'quantity', type: 'number' },
        { name: 'size', type: 'text' },
      ],
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
    },
  ],
}