import clsx from 'clsx'
import { useAtomValue, useSetAtom } from 'jotai'
import { type HTMLAttributes, type SyntheticEvent } from 'react'

import EXAMPLES from '../examples'

import { fetchImageAtom, fillExampleAtom, loadingAtom } from '../atoms'

export type ExamplesProps = HTMLAttributes<HTMLDivElement>

export default function Examples({ className, ...rest }: ExamplesProps) {
  const loading = useAtomValue(loadingAtom)
  const fetchImage = useSetAtom(fetchImageAtom)
  const fillExample = useSetAtom(fillExampleAtom)

  const handleExampleClick = async (event: SyntheticEvent<HTMLButtonElement>) => {
    if (loading) return
    const example = EXAMPLES.find(
      (e) => e.children === event.currentTarget.textContent
    ) as (typeof EXAMPLES)[number]
    fillExample(example)
    await fetchImage()
  }

  return (
    <div className={clsx('grid gap-4 grid-cols-2 md:grid-cols-4', className)} {...rest}>
      {EXAMPLES.map(({ children }) => (
        <ExamplesButton key={children} onClick={handleExampleClick} loading={loading}>
          {children}
        </ExamplesButton>
      ))}
    </div>
  )
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

function ExamplesButton({ children, loading = false, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        'px-1 py-2 w-full flex items-center justify-center rounded-md font-medium text-sm shadow-sm active:shadow-none active:scale-[0.9875] md:text-base',
        {
          'text-neutral-600 bg-neutral-100 dark:text-neutral-400 dark:bg-neutral-900':
            !loading,
          'cursor-not-allowed text-neutral-600/75 bg-neutral-100/75 dark:text-neutral-400/75 dark:bg-neutral-800/75':
            loading
        }
      )}
      type="button"
      title={loading ? 'Loading...' : undefined}
      {...rest}
    >
      {children}
    </button>
  )
}
