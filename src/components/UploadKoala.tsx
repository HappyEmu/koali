import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { cn } from '@/util'

type Props = {
  className?: string
}

export async function UploadKoala({ className }: Props) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    return null
  }

  return (
    <input
      type="file"
      className={cn('p-4 border rounded-lg text-center cursor-pointer', className)}
    />
  )
}
