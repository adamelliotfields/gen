import clsx from 'clsx'
import { HTMLAttributes, type PropsWithChildren } from 'react'

import Container from './Container'

export default function Footer({
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <footer
      className={clsx(
        'border-t text-neutral-500 bg-neutral-50 border-neutral-300 dark:bg-neutral-950 dark:border-neutral-700',
        className
      )}
      {...rest}
    >
      <Container className="h-14 items-center justify-center" border>
        <span className="font-mono text-sm">&copy;{new Date().getFullYear()}</span>
      </Container>
    </footer>
  )
}
