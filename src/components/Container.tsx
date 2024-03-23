import clsx from 'clsx'
import { type HTMLAttributes, type PropsWithChildren } from 'react'

type As = 'div' | 'footer' | 'header' | 'main'

export interface ContainerProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  as?: As
}

export default function Container({
  as = 'div',
  children,
  className,
  ...rest
}: ContainerProps) {
  const Component = as
  return (
    <Component
      className={clsx(
        'h-full w-full max-w-screen-lg mx-auto',
        'border-neutral-300 md:border-x dark:border-neutral-700',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
