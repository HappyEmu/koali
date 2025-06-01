import { getPayload } from 'payload'
import Form from 'next/form'
import config from '@payload-config'
import { headers } from 'next/headers'
import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { uploadKoalaAction } from '@/actions/upload'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label as UiLabel } from './ui/label'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './ui/drawer'

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
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className="mt-4 absolute bottom-4 left-4">Upload</Button>
      </DrawerTrigger>
      <DrawerContent className="dark bg-eucalyptus-600 p-4">
        <DrawerTitle>Upload a new Koala</DrawerTitle>
        <Form className={cn('flex flex-col gap-4', className)} action={uploadKoalaAction}>
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
      </DrawerContent>
    </Drawer>
  )
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
