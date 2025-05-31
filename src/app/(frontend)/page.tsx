import config from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'
import { unstable_cache as nextCache } from 'next/cache'

export default async function HomePage() {
  const koala = await getCurrentKoalaCached()

  return (
    <div className="flex flex-col h-dvh items-center justify-center mx-10">
      <h1 className="text-2xl sm:text-3xl font-bold flex flex-col items-center text-center gap-2">
        <span>Koali&apos;s Koala of the day</span>
        <span>🐨 🐨 🐨</span>
      </h1>

      {koala && (
        <Image
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={koala.url ?? ''}
          alt={koala.alt ?? 'Koala'}
          width={koala.width ?? 0}
          height={koala.height ?? 0}
          className="rounded-lg mt-4 max-h-[70vh]"
          style={{
            objectFit: 'contain',
          }}
        />
      )}
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

  if (!img) {
    return null
  }

  return img
}

const getCurrentKoalaCached = nextCache(
  async () => {
    return getCurrentKoala()
  },
  ['currentKoala'],
  { tags: ['currentKoala'] },
)
