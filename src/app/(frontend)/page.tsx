import config from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'
import { unstable_cache as nextCache } from 'next/cache'
import { UploadKoala } from '@/components/UploadKoala'
import { Suspense } from 'react'

export default async function HomePage() {
  const koala = await getCurrentKoalaCached()

  const img = asObject(koala?.image)
  const description = koala?.description

  const formattedDate = koala?.date
    ? new Date(koala.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : null

  return (
    <div className="flex flex-col min-h-dvh items-center py-10 px-6">
      {/* Header */}
      <header className="text-center mb-6 shrink-0">
        <p className="text-eucalyptus-400 text-xs tracking-[0.3em] uppercase mb-3 font-light">
          Daily Feature
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
          Koali&apos;s Koala
        </h1>
        <p className="text-xl sm:text-2xl font-light text-cream-300 mt-1">of the Day</p>
        <div className="flex items-center gap-3 mt-5 justify-center">
          <div className="h-px w-16 bg-eucalyptus-600" />
          <span className="text-lg">🐨</span>
          <div className="h-px w-16 bg-eucalyptus-600" />
        </div>
      </header>

      {/* Koala image — grows to fill all available vertical space */}
      {img ? (
        <div className="relative flex-1 min-h-0 w-full max-w-4xl flex items-center justify-center py-2">
          <div className="absolute inset-0 rounded-3xl bg-eucalyptus-500/20 blur-2xl pointer-events-none" />
          <Image
            fetchPriority="high"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            src={img.url ?? ''}
            alt={img.alt ?? 'Koala'}
            width={img.width ?? 0}
            height={img.height ?? 0}
            className="relative rounded-2xl drop-shadow-2xl max-h-full w-auto max-w-full ring-1 ring-white/10"
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-eucalyptus-400">
          <p className="text-7xl mb-4">🐨</p>
          <p className="text-lg font-light">No koala today… yet.</p>
        </div>
      )}

      {/* Date */}
      {formattedDate && (
        <p className="mt-5 shrink-0 text-eucalyptus-400 text-sm tracking-wide">{formattedDate}</p>
      )}

      {/* Description */}
      {description && (
        <blockquote className="text-center mt-3 shrink-0 text-cream-200/90 italic text-lg sm:text-xl max-w-xl leading-relaxed">
          &ldquo;{description}&rdquo;
        </blockquote>
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
