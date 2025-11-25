import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GBT Sorgulama Sistemi | Emniyet Genel Müdürlüğü',
  description: 'Genel Bilgi Toplama - Suç Kaydı Sorgulama ve Kayıt Sistemi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-egm-darker min-h-screen">
        {children}
      </body>
    </html>
  )
}
