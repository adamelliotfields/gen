import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { ExternalLink } from 'lucide-react'
import type { HTMLAttributes, PropsWithChildren } from 'react'

import { errorAtom, imageUrlAtom, loadingAtom, sizeAtom } from '../atoms'
import Examples from './Examples'

// "markdown"
const data = [
  ['Welcome! 👋'],
  [
    'This is a web interface for ',
    ['Stable Diffusion XL', 'https://stability.ai/stable-image'],
    ', powered by the ',
    ['🤗', 'https://huggingface.co'],
    ' ',
    ['Inference API', 'https://huggingface.co/inference-api/serverless'],
    ' .'
  ],
  [
    "If you're new to image generation, read the ",
    ['Basics of Prompt Engineering', 'https://dreamstudio.ai/prompt-guide'],
    ' from ',
    ['Stability.ai', 'https://stability.ai'],
    ' .'
  ],
  [
    'Start with an example below, customize the prompt, and explore the settings.',
    ' Have fun! 🎨'
  ]
]

export default function Display() {
  const imageUrl = useAtomValue(imageUrlAtom)
  const error = useAtomValue(errorAtom)
  const loading = useAtomValue(loadingAtom)

  // dimensions
  const [width, height] = useAtomValue(sizeAtom)

  // error
  if (!loading && error !== null) {
    return (
      <DisplayWrapper height={height} width={width}>
        <DisplayProse>
          <code>{error.message}</code>
        </DisplayProse>
      </DisplayWrapper>
    )
  }

  // no error, has image
  if (!loading && !error && imageUrl !== null) {
    return (
      <div className="h-full">
        <div className="h-full relative group">
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4"
          >
            <ExternalLink
              size="1em"
              className="transition-colors text-[24px] text-transparent group-hover:text-white"
            />
          </a>
          <img src={imageUrl} className="max-h-full max-w-full" alt="Generated" />
        </div>
      </div>
    )
  }

  // loading or initial state
  return (
    <DisplayWrapper height={height} width={width} loading={loading}>
      {loading ? null : (
        <DisplayProse>
          {data.map((line, i) => (
            <p key={i}>
              {line.map((part, j) =>
                typeof part === 'string' ? (
                  part
                ) : (
                  <a key={j} href={part[1]} target="_blank" rel="noopener noreferrer">
                    {part[0]}
                  </a>
                )
              )}
            </p>
          ))}
        </DisplayProse>
      )}
      <Examples className="mt-8" />
    </DisplayWrapper>
  )
}

interface DisplayWrapperProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  height?: number
  width?: number
  loading?: boolean
}

function DisplayWrapper({
  children,
  height,
  width,
  loading = false,
  ...rest
}: DisplayWrapperProps) {
  return (
    <div
      style={{ height, width }}
      className={clsx(
        'max-w-full max-h-full',
        loading
          ? undefined
          : 'px-6 py-4 rounded-sm border border-dashed border-neutral-400 dark:border-neutral-600'
      )}
      {...rest}
    >
      {loading ? <DisplayLoading height={height} width={width} /> : children}
    </div>
  )
}

function DisplayProse({
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <div
      className="prose prose-neutral prose-sm max-w-none md:prose-base dark:prose-invert"
      {...rest}
    >
      {children}
    </div>
  )
}

interface DisplayLoadingProps {
  height?: number
  width?: number
}

// square SVG with a pulse/shimmer animation
function DisplayLoading({ width = 1024, height = 1024 }: DisplayLoadingProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      stroke="none"
      className="max-h-full max-w-full animate-pulse cursor-progress text-neutral-200 dark:text-neutral-800"
    >
      <title>Loading...</title>
      <rect width={width} height={height} x="0" y="0" rx="0" />
    </svg>
  )
}
