import clsx from 'clsx'
import { useAtom, useAtomValue } from 'jotai'
import { Disc3, Info, Send } from 'lucide-react'

import { loadingAtom, promptAtom } from '../atoms'

export interface PromptProps {
  onClick: () => void
}

export default function Prompt({ onClick }: PromptProps) {
  const loading = useAtomValue(loadingAtom)
  const [prompt, setPrompt] = useAtom(promptAtom)

  return (
    <div className="mt-4 w-full relative">
      <textarea
        className="w-full h-[84px] md:h-[168px] rounded-sm border-none resize-none font-mono text-neutral-900 bg-neutral-100 placeholder:text-neutral-400 dark:text-neutral-50 dark:bg-neutral-800"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What do you want to see?"
      />
      <button
        className={clsx(
          'p-2 absolute bottom-8 right-3 rounded-full text-white bg-neutral-400 shadow-sm dark:bg-neutral-600',
          loading ? 'cursor-not-allowed' : 'active:shadow-none active:scale-[0.975]'
        )}
        type="submit"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? <Disc3 size={16} className="animate-spin" /> : <Send size={16} />}
      </button>
      {/* info text */}
      <div className="flex items-center text-xs text-neutral-500">
        <Info size="1em" className="mr-1" />
        <span>Images take ~20s to generate</span>
      </div>
    </div>
  )
}
