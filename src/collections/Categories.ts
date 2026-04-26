import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    // Added 'parent' to the columns so you can see the hierarchy in the list view
    defaultColumns: ['title', 'slug', 'parent'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Category Name (e.g. Men, Women, Panjabi, Saree)',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories', // This points back to this same collection
      label: 'Parent Category',
      admin: {
        position: 'sidebar',
        description: 'Leave empty if this is a main category (like Men or Women).',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.title) {
              return data.title
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '')
                .replace(/--+/g, '-')
            }
            return value
          },
        ],
      },
    },
  ],
}