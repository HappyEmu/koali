import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'prefix',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      }
    }
  ],
  upload: true,
}
