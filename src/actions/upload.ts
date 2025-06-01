'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { unauthorized } from 'next/navigation'

export async function uploadKoalaAction(formData: FormData) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    unauthorized()
  }

  const file = formData.get('file') as File
  const description = formData.get('description') as string
  const date = formData.get('date') as string

  const img = await payload.create({
    collection: 'media',
    data: {
      alt: 'Nothing',
    },
    file: {
      data: Buffer.from(await file.bytes()),
      name: file.name,
      mimetype: file.type,
      size: file.size,
    },
  })

  await payload.create({
    collection: 'koalas',
    data: {
      image: img.id,
      description,
      date: (date ? new Date(date) : new Date()).toISOString(),
    },
  })

  revalidatePath('/')
}
