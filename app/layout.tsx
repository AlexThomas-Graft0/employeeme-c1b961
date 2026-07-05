import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'employeeme',
  description: 'we are a new type of company that helps young adults with little-to-no qualifications find skills and work without endless courses and dead-end jobs',
}

export default function RootLayout({
  children,
}: {
  children: React.Node
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#FBFBF9] text-[#1C293C] antialiased min-h-screen selection:bg-[#FDC800] selection:text-[#1C293C]">
        {children}
      </body>
    </html>
  )
}