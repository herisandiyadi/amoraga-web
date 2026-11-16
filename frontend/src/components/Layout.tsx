'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ChatWidget from './ChatWidget'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-surface/95 backdrop-blur border-b border-border-light sticky top-0 z-40">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><img src="/logo.png" alt="Amoraga Creative" className="h-10 w-auto" /><span className="font-display text-xl tracking-wide hidden sm:inline">Amoraga Creative</span></Link>
          <ul className="flex gap-8">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-olive border-b-2 border-olive pb-1'
                      : 'text-charcoal hover:text-olive'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-taupe/20 border-t border-border-light py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-lg mb-4">Amoraga Creative</h3>
              <p className="text-warm-gray text-sm">
                Premium mirror and glass products crafted with precision for homes and businesses.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-warm-gray">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-olive">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <p className="text-sm text-warm-gray">
                Questions about our products?<br />
                <Link href="/contact" className="text-olive hover:underline">Send us a message</Link>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border-light text-center text-sm text-warm-gray">
            © {new Date().getFullYear()} Amoraga Creative All rights reserved.
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  )
}
