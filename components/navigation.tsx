"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/generate", label: "Generate" },
    { href: "/analyze", label: "Analyze" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-bold kolamkar-logo">
            Kolamkar
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base ${
                  pathname === item.href
                    ? "text-white bg-background/50 neon-border-blue"
                    : "text-muted-foreground hover:text-white hover:neon-border"
                }`}
              >
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-background/30 neon-border-blue rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 font-medium text-white">{item.label}</span>
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 border-t border-border pt-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                    pathname === item.href
                      ? "text-white bg-background/50 neon-border-blue"
                      : "text-muted-foreground hover:text-white hover:bg-background/30"
                  }`}
                >
                  <span className="font-medium text-white">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
