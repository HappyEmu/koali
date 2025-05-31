import { gcsStorage } from '@payloadcms/storage-gcs'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Koalas } from './collections/Koala'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  graphQL: {
    disable: true,
    disablePlaygroundInProduction: true,
  },
  collections: [Users, Media, Koalas],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin({
      storage: false,
    }),
    gcsStorage({
      enabled: Boolean(process.env.GCS_SERVICE_ACCOUNT_PRIVATE_KEY),
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.GCS_BUCKET_NAME,
      options: {
        projectId: process.env.GCS_PROJECT_ID,
        credentials: {
          client_id: process.env.GCS_SERVICE_ACCOUNT_CLIENT_ID,
          client_email: process.env.GCS_SERVICE_ACCOUNT_CLIENT_EMAIL,
          private_key: process.env.GCS_SERVICE_ACCOUNT_PRIVATE_KEY,
        },
      },
      clientUploads: true,
    }),
  ],
})
