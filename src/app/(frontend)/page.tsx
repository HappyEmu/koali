import config from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'
import { unstable_cache as nextCache } from 'next/cache'

export default async function HomePage() {
  const koala = await getCurrentKoalaCached()
  const img = asObject(koala?.image)

  return (
    <div className="flex flex-col h-dvh items-center justify-center mx-10">
      <h1 className="text-2xl sm:text-3xl font-bold flex flex-col items-center text-center gap-2">
        <span>Koali&apos;s Koala of the day</span>
        <span>🐨 🐨 🐨</span>
      </h1>

      {img && (
        <Image
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={img.url ?? ''}
          alt={img.alt ?? 'Koala'}
          width={img.width ?? 0}
          height={img.height ?? 0}
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
    docs: [koala],
  } = await payload.find({
    collection: 'koalas',
    limit: 1,
    sort: '-createdAt',
    depth: 2,
  })

  if (!koala) {
    return null
  }

  return koala
}

const getCurrentKoalaCached = nextCache(
  async () => {
    return getCurrentKoala()
  },
  ['currentKoala'],
  { tags: ['currentKoala'] },
)

function asObject<T>(obj: string | number | T | undefined): T {
  if (!obj) {
    throw new Error(`Expected an object, but received undefined or null`)
  }

  if (typeof obj === 'object') {
    return obj
  }

  throw new Error(`Expected an object, but received a primitive value: '${obj}'`)
}
