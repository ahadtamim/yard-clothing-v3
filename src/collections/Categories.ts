import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    // This hides the 'Sentences/Summary' view to keep it clean
    defaultColumns: ['title'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Category Name (e.g. Mens, Womens, New Arrival)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      // HIDE THE SLUG: It will generate automatically from the title
      admin: {
        position: 'sidebar',
        hidden: true, 
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.title) {
              return data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }
            return value
          },
        ],
      },
    },
  ],
}