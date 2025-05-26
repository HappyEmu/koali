import config from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'

export default async function HomePage() {
  const koala = await getCurrentKoala()

  return (
    <div className="flex flex-col h-screen items-center justify-center mx-10">
      <h1 className="text-3xl font-bold">🐨 Koalis Koala of the day 🐨</h1>
      <Image
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={koala.url ?? ''}
        alt={koala.alt ?? 'Koala'}
        width={koala.width ?? 0}
        height={koala.height ?? 0}
        className="rounded-lg shadow-lg mt-4"
      />
    </div>
  )
}

async function getCurrentKoala() {
  const payload = await getPayload({ config })

  const {
    docs: [img],
  } = await payload.find({
    collection: 'media',
    limit: 1,
    sort: '-createdAt',
  })

  return img
}
