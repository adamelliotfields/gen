import { atom } from 'jotai'

import config, { type Config } from './config'

export const examplesOpenAtom = atom(false)

export const settingsOpenAtom = atom(false)

export const serverAtom = atom(config.servers[0].name)

export const modelAtom = atom<string | null>(config.servers[0].models?.[0] ?? null)

export const aspectRatioIndexAtom = atom(2)

export const guidanceScaleAtom = atom(10.0)

export const inferenceStepsAtom = atom(40)

export const negativePromptAtom = atom<string | undefined>(undefined)

export const promptAtom = atom('')

export const imageUrlAtom = atom<string | null>(null)

export const loadingAtom = atom(false)

export const errorAtom = atom<Error | null>(null)

// derived atoms

export const serverConfigAtom = atom((get) => {
  const server = get(serverAtom)
  return (
    config.servers.find((s) => s.name === server) ?? ({} as Config['servers'][number])
  )
})

export const aspectRatioAtom = atom((get) => {
  const aspectRatios = ['9:16', '3:4', '1:1', '4:3', '16:9']
  const index = get(aspectRatioIndexAtom)
  return aspectRatios[index]
})

export const sizeAtom = atom((get) => {
  const aspectRatio = get(aspectRatioAtom)
  const server = get(serverConfigAtom)
  const [numerator, denominator] = aspectRatio.split(':').map(Number)
  const maxHeight = server?.max_height ?? 1024
  const maxWidth = server?.max_width ?? 1024
  const height = Math.min(maxHeight, Math.round((maxWidth * denominator) / numerator))
  const width = Math.min(maxWidth, Math.round((maxHeight * numerator) / denominator))
  return [width, height]
})
