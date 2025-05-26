import React from 'react'

import './global.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-gray-300 text-gray-900">
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  )
}
