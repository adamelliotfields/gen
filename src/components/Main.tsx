import clsx from 'clsx'
import { type HTMLAttributes, type PropsWithChildren } from 'react'

import Container from './Container'
import Display from './Display'
import Prompt from './Prompt'
import Settings from './Settings'

export default function Main({
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <>
      <Container
        as="main"
        className="p-8 flex items-center justify-center max-h-[calc(100vh_-_240px)] md:max-h-[calc(100vh_-_332px)]"
      >
        <Display />
      </Container>
      <footer
        className={clsx(
          'z-20',
          'border-t border-neutral-300 dark:border-neutral-700',
          className
        )}
        {...rest}
      >
        <Container className="p-4 flex flex-col">
          <Settings />
          <Prompt />
        </Container>
      </footer>
    </>
  )
}
