import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const merriweather = Merriweather({ weight: ['300', '400', '700'], subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'Tulunadu Taste | Authentic Regional Spices & Pickles',
  description: 'Experience the rich, earthy flavors and intense spices of the Tulu Nadu region. Premium authentic Indian pickles.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${merriweather.variable}`}>
      <body className="antialiased bg-brand-olive text-white selection:bg-brand-chili selection:text-white">
        {children}
      </body>
    </html>
  )
}
