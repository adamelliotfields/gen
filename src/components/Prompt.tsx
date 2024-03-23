import clsx from 'clsx'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { Disc3, Info, Send } from 'lucide-react'

import {
  aspectRatioIndexAtom,
  fetchImageAtom,
  guidanceScaleAtom,
  imageUrlAtom,
  inferenceStepsAtom,
  loadingAtom,
  negativePromptAtom,
  promptAtom
} from '../atoms'

export default function Prompt() {
  const [prompt, setPrompt] = useAtom(promptAtom)
  const loading = useAtomValue(loadingAtom)

  const setNegativePrompt = useSetAtom(negativePromptAtom)
  const setInferenceSteps = useSetAtom(inferenceStepsAtom)
  const setGuidanceScale = useSetAtom(guidanceScaleAtom)
  const setAspectRatioIndex = useSetAtom(aspectRatioIndexAtom)
  const setImageUrl = useSetAtom(imageUrlAtom)

  const fetchImage = useSetAtom(fetchImageAtom)

  const canSubmit = !loading && prompt.trim().length > 0

  const handleResetClick = () => {
    setImageUrl(null)
    setPrompt('')
    setNegativePrompt('')
    setAspectRatioIndex(RESET)
    setInferenceSteps(RESET)
    setGuidanceScale(RESET)
  }

  const handleSubmit = async () => {
    if (!canSubmit) return
    await fetchImage()
  }

  return (
    <div className="mt-4 w-full relative">
      <textarea
        className="w-full h-[84px] md:h-[168px] rounded-sm border-none resize-none font-mono text-sm text-neutral-900 bg-neutral-100 placeholder:text-neutral-400 dark:text-neutral-50 dark:bg-neutral-800 md:text-base"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What do you want to see?"
      />
      <button
        className={clsx(
          'p-2 absolute bottom-8 right-3 rounded-full shadow-sm md:bottom-9',
          {
            'text-white bg-neutral-400 active:shadow-none active:scale-[0.975] dark:bg-neutral-600':
              canSubmit,
            'text-white/75 bg-neutral-400/75 cursor-not-allowed dark:bg-neutral-600/75':
              !canSubmit
          }
        )}
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <Disc3 size="1em" className="animate-spin text-[16px] md:text-[20px]" />
        ) : (
          <Send size="1em" className="text-[16px] md:text-[20px]" />
        )}
      </button>
      {/* info text */}
      <div className="flex text-xs md:text-sm">
        <div className="flex items-center text-neutral-500">
          <Info size="1em" className="mr-1" />
          <span>Images take ~20s to generate</span>
          <span className="mx-1">&bull;</span>
        </div>
        {/* reset button */}
        <button
          type="button"
          className="underline transition-colors text-neutral-500 hover:text-rose-500"
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
