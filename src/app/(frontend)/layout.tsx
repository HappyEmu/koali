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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Solway:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-eucalyptus-800 text-cream-100 solway-regular">
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  )
}
