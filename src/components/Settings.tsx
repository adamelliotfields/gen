import clsx from 'clsx'
import { useAtom, useAtomValue } from 'jotai'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { type HTMLAttributes, type SyntheticEvent, useState } from 'react'

import {
  aspectRatioAtom,
  aspectRatioIndexAtom,
  guidanceScaleAtom,
  inferenceStepsAtom,
  modelAtom,
  negativePromptAtom,
  serverAtom,
  serverConfigAtom,
  sizeAtom
} from '../atoms'

import config, { Setting } from '../config'

export default function Settings() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [server, setServer] = useAtom(serverAtom)
  const [model, setModel] = useAtom(modelAtom)
  const [aspectRatioIndex, setAspectRatioIndex] = useAtom(aspectRatioIndexAtom)
  const [guidanceScale, setGuidanceScale] = useAtom(guidanceScaleAtom)
  const [inferenceSteps, setInferenceSteps] = useAtom(inferenceStepsAtom)
  const [negativePrompt, setNegativePrompt] = useAtom(negativePromptAtom)
  const [width, height] = useAtomValue(sizeAtom)
  const serverConfig = useAtomValue(serverConfigAtom)
  const aspectRatio = useAtomValue(aspectRatioAtom)

  // available settings
  const { settings = [] } = serverConfig
  const hasSize = settings.includes(Setting.SIZE) ?? false
  const hasNegativePrompt = settings.includes(Setting.NEGATIVE_PROMPT) ?? false
  const hasGuidanceScale = settings.includes(Setting.GUIDANCE_SCALE) ?? false
  const hasInferenceSteps = settings.includes(Setting.INFERENCE_STEPS) ?? false

  const handleClick = () => {
    setSettingsOpen(!settingsOpen)
  }

  const handleServerChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    setServer(e.currentTarget.value)
  }

  const handleModelChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    setModel(e.currentTarget.value)
  }

  const handleSizeChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setAspectRatioIndex(parseInt(e.currentTarget.value))
  }

  return (
    <>
      <button
        className="w-fit flex items-center font-semibold text-base text-neutral-700 dark:text-neutral-300 md:text-lg"
        type="button"
        onClick={handleClick}
      >
        <span className="mr-0.5">Settings</span>
        {settingsOpen ? (
          <ChevronDown className="text-[16px] md:text-[20px]" size="1em" />
        ) : (
          <ChevronRight className="text-[16px] md:text-[20px]" size="1em" />
        )}
      </button>
      {settingsOpen && (
        <div className="p-4 flex flex-col space-y-4">
          <div className="w-full flex flex-col space-x-0 md:mt-0 md:mr-4 md:flex-row md:space-x-4">
            {/* API server */}
            <div className="w-full">
              <SettingsLabel htmlFor="negativePrompt">API</SettingsLabel>
              <div className="flex items-center text-sm md:text-base">
                <img
                  src={config.servers.find((s) => s.name === server)?.icon}
                  alt={server}
                  className="h-[36px] p-2 inline-block rounded-l-sm bg-neutral-100 dark:bg-neutral-800 md:h-[42px]"
                />
                <select
                  className="h-[36px] w-full rounded-r-sm border-none font-mono text-neutral-900 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-800 md:h-[42px]"
                  name="api"
                  id="api"
                  value={server}
                  onChange={handleServerChange}
                >
                  {config.servers.map((s) => (
                    <option key={s.name} value={s.name} disabled={s.disabled}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Model */}
            <div className="w-full mt-4 md:mt-0">
              <SettingsLabel htmlFor="model">Model</SettingsLabel>
              <select
                id="model"
                className="h-[36px] w-full rounded-sm border-none font-mono text-sm text-neutral-900 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-800 md:h-[42px] md:text-base"
                value={model ?? ''}
                onChange={handleModelChange}
              >
                {serverConfig.models?.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Size */}
          {hasSize && (
            <div className="w-full">
              <SettingsLabel htmlFor="aspect-ratio">
                Size:&nbsp;
                <span className="font-mono text-neutral-900 dark:text-neutral-100">
                  {`${width}x${height} (${aspectRatio})`}
                </span>
              </SettingsLabel>
              <input
                type="range"
                min={0}
                max={4}
                step={1}
                value={aspectRatioIndex}
                id="aspect-ratio"
                className="w-full"
                onChange={handleSizeChange}
              />
            </div>
          )}

          {/* Guidance scale */}
          <div className="flex flex-wrap md:flex-nowrap">
            {(hasGuidanceScale || hasInferenceSteps) && (
              <div className="w-full flex space-x-4 md:w-fit md:order-2">
                {hasGuidanceScale && (
                  <div className="w-full">
                    <SettingsLabel htmlFor="guidance-scale">
                      Guidance Scale
                    </SettingsLabel>
                    <SettingsNumberInput
                      id="guidance-scale"
                      value={guidanceScale}
                      max={30.0}
                      step={0.1}
                      onChange={(e) =>
                        setGuidanceScale(
                          Math.min(30.0, parseFloat(e.currentTarget.value))
                        )
                      }
                    />
                  </div>
                )}

                {/* Inference steps */}
                {hasInferenceSteps && (
                  <div className="w-full">
                    <SettingsLabel htmlFor="inference-steps">
                      Inference Steps
                    </SettingsLabel>
                    <SettingsNumberInput
                      id="inference-steps"
                      value={inferenceSteps}
                      max={100}
                      step={1}
                      onChange={(e) =>
                        setInferenceSteps(
                          Math.min(100, parseInt(e.currentTarget.value))
                        )
                      }
                    />
                  </div>
                )}
              </div>
            )}

            {/* Negative prompt */}
            {hasNegativePrompt && (
              <div
                className={clsx('mt-4 w-full flex flex-col md:mt-0 md:order-1', {
                  'md:mr-4': hasGuidanceScale || hasInferenceSteps
                })}
              >
                <SettingsLabel htmlFor="negativePrompt">Negative Prompt</SettingsLabel>
                {/* Text area */}
                <textarea
                  className="h-[36px] w-full rounded-sm border-none resize-none font-mono text-sm text-neutral-900 bg-neutral-100 placeholder:text-neutral-400 dark:text-neutral-100 dark:bg-neutral-800 md:h-[42px] md:text-base"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="bad, ugly"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

interface SettingsNumberInputProps extends HTMLAttributes<HTMLInputElement> {
  id: string
  min?: number
  max?: number
  step?: number
  value: number
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void
}

function SettingsNumberInput({
  id,
  min = 0,
  max,
  step = 1,
  value,
  onChange,
  ...rest
}: SettingsNumberInputProps) {
  return (
    <input
      type="number"
      id={id}
      className="h-[42px] w-full rounded-sm border-none font-mono text-sm text-neutral-900 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-800 md:text-base"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      {...rest}
    />
  )
}

interface SettingsLabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor: string
}

function SettingsLabel({ htmlFor, children, ...rest }: SettingsLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-neutral-700 dark:text-neutral-300 md:text-base"
      {...rest}
    >
      {children}
    </label>
  )
}
