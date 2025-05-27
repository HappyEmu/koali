import React from 'react'

import './global.css'

export const metadata = {
  title: "Koali's Koala of the Day",
  description: 'Ever wondered what koala is the cutest today? Koali has the answer!',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  )
}
