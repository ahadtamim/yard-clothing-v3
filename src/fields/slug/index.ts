import type { Field } from 'payload'

export const slugField = (fieldToUse: string = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
  },
})