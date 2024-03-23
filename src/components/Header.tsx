import clsx from 'clsx'
import { Computer, Menu, Moon, Sun, X } from 'lucide-react'
import { type HTMLAttributes, useEffect, useState } from 'react'
import { Link, useRoute } from 'wouter'

import Container from './Container'

const themes = ['dark', 'light', 'system'] as const
type Theme = (typeof themes)[number]

const { VITE_HOMEPAGE, VITE_TITLE } = import.meta.env

interface HeaderLinkType {
  href: string
  children: string
}

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  links?: HeaderLinkType[]
}

export default function Header({ className, links, ...rest }: HeaderProps) {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [open, setOpen] = useState(false)

  const hasLinks = Array.isArray(links) && links.length > 0

  const themes = [
    { name: 'light' as const, icon: Sun, label: 'Use light theme' },
    { name: 'dark' as const, icon: Moon, label: 'Use dark theme' },
    { name: 'system' as const, icon: Computer, label: 'Use system theme' }
  ]

  const toggleMenu = () => {
    setOpen(!open)
  }

  // set the data-theme attribute when `theme` changes
  useEffect(() => {
    const el = document.documentElement // <html>

    if (theme !== null) {
      el.setAttribute('data-theme', theme)
    } else {
      const data = el.getAttribute('data-theme') as Theme
      if (data !== theme) setTheme(data)
    }
  }, [theme])

  // listen for changes to LocalStorage
  useEffect(() => {
    const handler = (): void => {
      let dark = null
      try {
        // throws if dark is not valid JSON
        dark = JSON.parse(window.localStorage.getItem('dark') as string)
      } catch {}
      const storage = dark !== null ? 'dark' : dark === false ? 'light' : 'system'
      setTheme(storage)
    }

    // attach the handler and remove on unmount
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('storage', handler)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 bg-neutral-50 border-b border-neutral-300 z-20',
        'dark:bg-neutral-950 dark:border-neutral-700',
        className
      )}
      {...rest}
    >
      <Container className="h-14 p-4 flex items-center justify-between" border>
        {/* brand logo */}
        <a href={VITE_HOMEPAGE} className="font-bold font-mono text-xl tracking-wide">
          {`🖼️ ${VITE_TITLE}`}
        </a>
        {/* desktop links */}
        {hasLinks && (
          <div className="hidden md:mr-16 md:flex md:space-x-4">
            {links.map(({ children, href }) => (
              <HeaderLink key={href} href={href}>
                {children}
              </HeaderLink>
            ))}
          </div>
        )}
        {/* icon buttons */}
        <div className="flex items-center space-x-2">
          {/* mobile menu toggle button */}
          {hasLinks && (
            <button
              type="button"
              onClick={toggleMenu}
              className="flex md:hidden"
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? (
                <X className="text-neutral-900 dark:text-neutral-100" />
              ) : (
                <Menu className="text-neutral-900 dark:text-neutral-100" />
              )}
            </button>
          )}
          {themes.map(({ name, label, icon: Icon }) => (
            <button
              key={name}
              type="button"
              onClick={() => setTheme(name)}
              aria-label={label}
            >
              <Icon
                size="1em"
                className={clsx(
                  'text-[20px]',
                  theme === name
                    ? 'text-neutral-900 dark:text-neutral-100'
                    : 'text-neutral-400 dark:text-neutral-600'
                )}
              />
            </button>
          ))}
        </div>
      </Container>
      {/* mobile menu */}
      {hasLinks && (
        <div className={clsx('md:hidden', open ? 'block' : 'hidden')} id="mobile-menu">
          <div className="pb-4 px-4 flex flex-col space-y-2">
            {links.map(({ children, href }) => (
              <HeaderLink key={href} href={href}>
                {children}
              </HeaderLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function HeaderLink({ href, children }: { href: string; children: string }) {
  const [isActive] = useRoute(href)
  return (
    <Link
      to={href}
      className={clsx(
        'font-medium',
        isActive
          ? 'text-neutral-900 dark:text-neutral-100'
          : 'text-neutral-400 dark:text-neutral-600'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
