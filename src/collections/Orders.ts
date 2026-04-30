import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderID',
    description: 'Manage customer orders and inventory auto-reduction.',
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
    // NEW: Automatically reduce stock after an order is placed
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          for (const item of doc.items) {
            // Fetch the product related to the order item
            const product = await req.payload.findByID({
              collection: 'products',
              id: item.product,
            });

            // FIX 1: Cast product to 'any' to read the new inventory field
            const productData = product as any;

            if (productData && productData.inventory) {
              // Update the inventory array by subtracting the bought quantity
              const updatedInventory = productData.inventory.map((inv: any) => {
                if (inv.size === item.size) {
                  return { ...inv, stock: Math.max(0, inv.stock - (item.quantity || 1)) };
                }
                return inv;
              });

              // FIX 2: Cast the update call to 'any' to stop the Vercel build from crashing
              await (req.payload.update as any)({
                collection: 'products',
                id: item.product,
                data: { 
                  inventory: updatedInventory 
                },
              });
            }
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'orderID',
      type: 'text',
      label: 'Order ID',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'exportOrders',
      type: 'ui',
      admin: {
        components: { Field: '/components/ExportButton#ExportButton' },
        position: 'sidebar',
      },
    },
    { name: 'customerName', type: 'text', required: true },
    { name: 'email', type: 'email', required: false },
    { name: 'phone', type: 'text', required: true },
    { name: 'address', type: 'textarea', required: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'quantity', type: 'number', defaultValue: 1 },
        { name: 'size', type: 'text' },
      ],
    },
    { name: 'deliveryCharge', type: 'number', required: true },
    { name: 'totalAmount', type: 'number', required: true },
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