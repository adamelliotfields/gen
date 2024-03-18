import { useAtom, useSetAtom } from 'jotai'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { type HTMLAttributes, type SyntheticEvent } from 'react'

import {
  aspectRatioIndexAtom,
  examplesOpenAtom,
  guidanceScaleAtom,
  inferenceStepsAtom,
  negativePromptAtom,
  promptAtom
} from '../atoms'

type ButtonProps = HTMLAttributes<HTMLButtonElement>

const EXAMPLES = [
  {
    children: '🌅 sunset painting',
    prompt:
      'Oil painting of a sunset over the ocean with orange and pink hues, gently rolling waves, and palm trees, heavily textured brushstrokes, dramatic lighting',
    negative: 'birds',
    guidance: 7.5,
    steps: 30,
    aspect: 2 // 1:1
  },
  {
    children: '🏠 modern room',
    prompt:
      '3D rendering of a contemporary living room with large windows, mid-century furnishings, neutral tones, high detail',
    negative: 'high ceiling, clutter',
    guidance: 10,
    steps: 40,
    aspect: 4 // 16:9
  },
  {
    children: '🧔‍♂️ future soldier',
    prompt:
      'Portrait of bearded man wearing a worn mech suit, futuristic, sharp focus, light bokeh, photorealistic',
    negative: 'helmet, ugly',
    guidance: 12.5,
    steps: 50,
    aspect: 0 // 9:16
  },
  {
    children: '🐈 winter cat',
    prompt:
      'Gorgeous cat with medium-length orange hair and light-yellow eyes under falling snow looking at the camera, slow exposure, 8k',
    negative: 'lynx ears, collar',
    guidance: 12.5,
    steps: 50,
    aspect: 3 // 4:3
  }
]

export default function Examples() {
  const [examplesOpen, setExamplesOpen] = useAtom(examplesOpenAtom)
  const setPrompt = useSetAtom(promptAtom)
  const setNegativePrompt = useSetAtom(negativePromptAtom)
  const setGuidanceScale = useSetAtom(guidanceScaleAtom)
  const setInferenceSteps = useSetAtom(inferenceStepsAtom)
  const setAspectRatioIndex = useSetAtom(aspectRatioIndexAtom)

  const handleClick = () => {
    setExamplesOpen(!examplesOpen)
  }

  const handleExampleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    const example = EXAMPLES.find(
      (e) => e.children === event.currentTarget.textContent
    ) as (typeof EXAMPLES)[number]
    setPrompt(example.prompt)
    setNegativePrompt(example.negative)
    setGuidanceScale(example.guidance)
    setInferenceSteps(example.steps)
    setAspectRatioIndex(example.aspect)
  }

  return (
    <>
      <button
        className="w-fit flex items-center font-semibold text-neutral-700 dark:text-neutral-300"
        type="button"
        onClick={handleClick}
      >
        Examples
        {examplesOpen ? (
          <ChevronDown className="text-[20px]" size="1em" />
        ) : (
          <ChevronRight className="text-[20px]" size="1em" />
        )}
      </button>
      {examplesOpen && (
        <div className="p-4">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {EXAMPLES.map(({ children }) => (
              <ExamplesButton key={children} onClick={handleExampleClick}>
                {children}
              </ExamplesButton>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function ExamplesButton({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="px-1 py-2 w-full flex items-center justify-center rounded-md font-medium text-sm text-neutral-600 bg-neutral-100 shadow-sm active:shadow-none active:scale-[0.9875] dark:text-neutral-400 dark:bg-neutral-900"
      type="button"
      {...rest}
    >
      {children}
    </button>
  )
}
