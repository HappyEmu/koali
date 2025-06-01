import config from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'
import { unstable_cache as nextCache } from 'next/cache'
import { UploadKoala } from '@/components/UploadKoala'
import { Suspense } from 'react'

export const experimental_ppr = true

export default async function HomePage() {
  const koala = await getCurrentKoalaCached()

  const img = asObject(koala?.image)
  const description = koala?.description

  return (
    <div className="flex flex-col h-dvh items-center justify-center mx-10">
      <h1 className="text-2xl sm:text-[36pt] font-bold flex flex-col items-center text-center gap-2">
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
          className="rounded-lg shadow-2xl mt-4 max-h-[70vh]"
          style={{
            objectFit: 'contain',
          }}
        />
      )}

      {description && (
        <p className="text-center mt-4 sm:mt-8 sm:text-xl max-w-2xl">{description}</p>
      )}

      <Suspense>
        <UploadKoala />
      </Suspense>
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

function asObject<T>(obj: string | number | T | undefined): T | undefined {
  if (!obj) {
    return undefined
  }

  if (typeof obj === 'object') {
    return obj
  }

  throw new Error(`Expected an object, but received a primitive value: '${obj}'`)
}
