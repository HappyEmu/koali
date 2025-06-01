'use client'

import { ReactNode } from 'react'
import { Button } from './ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './ui/drawer'

type Props = {
  form: ReactNode
  className?: string
}

export function UploadKoalaDrawer({ form }: Props) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className="mt-4 absolute bottom-4 left-4">Upload</Button>
      </DrawerTrigger>
      <DrawerContent className="dark bg-eucalyptus-600 p-4">
        <DrawerTitle>Upload a new Koala</DrawerTitle>
        {form}
      </DrawerContent>
    </Drawer>
  )
}
