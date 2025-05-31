import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'
import { makeKoalaPublic } from './hooks/koala'

export const Koalas: CollectionConfig = {
  slug: 'koalas',
  hooks: {
    afterChange: [
      makeKoalaPublic,
      () => {
        revalidateTag('currentKoala')
      },
    ],
    afterDelete: [
      () => {
        revalidateTag('currentKoala')
      },
    ],
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}
