import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderID',
    description: 'Manage customer orders and download monthly sales reports.',
    defaultColumns: ['orderID', 'customerName', 'totalAmount', 'status', 'createdAt'],
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          const randomSuffix = Math.floor(1000 + Math.random() * 9000);
          return {
            ...data,
            orderID: `YRD-${Date.now().toString().slice(-4)}-${randomSuffix}`,
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'orderID',
      type: 'text',
      label: 'Order ID',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'exportOrders',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/ExportButton#ExportButton', 
        },
        position: 'sidebar',
      },
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      // Set to false to allow guest checkout without an email input
      required: false,
      unique: false,
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
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'quantity', type: 'number', defaultValue: 1 },
        { name: 'size', type: 'text' },
      ],
    },
    {
      name: 'deliveryCharge',
      type: 'number',
      required: true,
      admin: {
        description: '60 for Inside Dhaka, 120 for Outside Dhaka'
      }
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
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
    },
  ],
}