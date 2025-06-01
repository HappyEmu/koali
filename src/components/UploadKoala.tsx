import { PropsWithChildren } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import Form from 'next/form'
import { UploadKoalaDrawer } from './UploadKoalaDrawer'
import { Input } from './ui/input'
import { Label as UiLabel } from './ui/label'
import { Textarea } from './ui/textarea'
import { uploadKoalaAction } from '@/actions/upload'
import { Button } from './ui/button'

export async function UploadKoala() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    return null
  }

  const form = (
    <Form className="flex flex-col gap-4 mt-4" action={uploadKoalaAction}>
      <Field>
        <Label>File</Label>
        <Input id="file" name="file" type="file" required />
      </Field>

      <Field>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description"></Textarea>
      </Field>

      <Field>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" required />
      </Field>

      <Button type="submit">Upload</Button>
    </Form>
  )

  return <UploadKoalaDrawer form={form} />
}

function Field({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>
}

function Label({ htmlFor, children }: PropsWithChildren<{ htmlFor?: string }>) {
  return (
    <UiLabel htmlFor={htmlFor} className="text-xs">
      {children}
    </UiLabel>
  )
}
