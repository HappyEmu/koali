import { getStorage } from '@/lib/storage'
import { Koala } from '@/payload-types'
import { CollectionAfterChangeHook } from 'payload'

export const makeKoalaPublic: CollectionAfterChangeHook<Koala> = async ({
  operation,
  doc,
  req,
}) => {
  if (operation !== 'create') {
    return
  }

  const { payload } = req

  const koalaImg = await payload.findByID({
    collection: 'media',
    id: typeof doc.image === 'number' ? doc.image : doc.image.id,
    depth: 0,
  })

  const bucketName = process.env.GCS_BUCKET_NAME
  const filename = [koalaImg.prefix, koalaImg.filename].join('/')
  await getStorage().bucket(bucketName).file(filename).makePublic()
}
