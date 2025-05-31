import { Koala } from '@/payload-types'
import { CollectionAfterChangeHook } from 'payload'
import { Storage } from '@google-cloud/storage'

const options = {
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_id: process.env.GCS_SERVICE_ACCOUNT_CLIENT_ID,
    client_email: process.env.GCS_SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key: process.env.GCS_SERVICE_ACCOUNT_PRIVATE_KEY,
  },
}

const storage = new Storage(options)

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
    id: doc.image as number,
    depth: 0,
  })

  const bucketName = process.env.GCS_BUCKET_NAME
  const filename = [koalaImg.prefix, koalaImg.filename].join('/')
  await storage.bucket(bucketName).file(filename).makePublic()
}
