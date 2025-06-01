import React from 'react'
import { Solway } from 'next/font/google'

import './global.css'

const solway = Solway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
})

export const metadata = {
  title: "Koali's Koala of the Day",
  description: 'Ever wondered what koala is the cutest today? Koali has the answer!',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`bg-eucalyptus-800 text-cream-100 ${solway.className}`}>
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  )
}
