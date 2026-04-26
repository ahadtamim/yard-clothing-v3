import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
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
      label: 'Category Name',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Parent Category',
      admin: {
        position: 'sidebar',
        description: 'Select "Men" or "Women". Leave empty if this IS a main category.',
      },
      // Optional: prevents a category from being its own parent
      filterOptions: ({ id }) => {
        return {
          id: { not_equals: id },
        }
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
              return data.title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
            }
            return value
          },
        ],
      },
    },
  ],
}