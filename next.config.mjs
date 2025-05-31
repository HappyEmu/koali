import { withPayload } from '@payloadcms/next/withPayload'

const bucketName = process.env.GCS_BUCKET_NAME

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: `/v0/b/${bucketName}/o/**`,
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: `/${bucketName}/**`,
      },
    ],
  },
  // Your Next.js config here
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
