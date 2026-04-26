import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'], // Added slug here so you can see it in the admin list
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Category Name (e.g. Men, Women, New Arrival)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      // We keep it in the sidebar but read-only so you can verify it matches your URL
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
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w-]+/g, '')        // Remove all non-word chars (like ' in Men's)
                .replace(/--+/g, '-')           // Replace multiple - with single -
            }
            return value
          },
        ],
      },
    },
  ],
}