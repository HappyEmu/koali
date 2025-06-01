import { getPayload } from 'payload'
import Form from 'next/form'
import config from '@payload-config'
import { headers } from 'next/headers'
import { cn } from '@/util'
import { PropsWithChildren } from 'react'
import { uploadKoalaAction } from '@/actions/upload'

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
    <Form
      className={cn('flex flex-col gap-4 w-full max-w-[calc(min(480px,100%))]', className)}
      action={uploadKoalaAction}
    >
      <Field>
        <Label>File</Label>
        <input
          id="file"
          name="file"
          type="file"
          className="p-2 px-4 border rounded-lg text-center cursor-pointer w-full text-xs"
        />
      </Field>

      <Field>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          className="border rounded-lg px-2 p-1  w-full"
        ></textarea>
      </Field>

      <Field>
        <Label htmlFor="date">Date</Label>
        <input id="date" name="date" type="date" className="border rounded-lg px-2 p-1" />
      </Field>

      <button className="border rounded-lg p-1" type="submit">
        Upload
      </button>
    </Form>
  )
}

function Field({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>
}

function Label({ htmlFor, children }: PropsWithChildren<{ htmlFor?: string }>) {
  return (
    <label htmlFor={htmlFor} className="text-xs">
      {children}
    </label>
  )
}
