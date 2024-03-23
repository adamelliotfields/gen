import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

import CONFIG, { type Config } from './config'
import EXAMPLES from './examples'
import huggingfaceFetch from './fetchers/huggingface'

export const serverAtom = atom(CONFIG.servers[0].name)
export const modelAtom = atom<string>(CONFIG.servers[0].models[0])
export const aspectRatioIndexAtom = atomWithReset(2)
export const guidanceScaleAtom = atomWithReset(10)
export const imageUrlAtom = atom<string | null>(null)
export const inferenceStepsAtom = atomWithReset(40)
export const negativePromptAtom = atom('')
export const promptAtom = atom('')
export const loadingAtom = atom(false)
export const errorAtom = atom<Error | null>(null)

// gets the server config based on the current server name
export const serverConfigAtom = atom((get) => {
  const server = get(serverAtom)
  return (
    CONFIG.servers.find((s) => s.name === server) ?? ({} as Config['servers'][number])
  )
})

// gets the aspect ratio based on the current aspect ratio index
export const aspectRatioAtom = atom((get) => {
  const aspectRatios = ['9:16', '3:4', '1:1', '4:3', '16:9']
  const index = get(aspectRatioIndexAtom)
  return aspectRatios[index]
})

// returns a [w,h] tuple based on the current aspect ratio
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

// fills forms from example data
export const fillExampleAtom = atom(
  null,
  (_, set, example: (typeof EXAMPLES)[number]) => {
    set(promptAtom, example.prompt)
    set(negativePromptAtom, example.negative_prompt)
    set(guidanceScaleAtom, example.guidance_scale)
    set(inferenceStepsAtom, example.num_inference_steps)
    set(aspectRatioIndexAtom, example.aspect_ratio_index)
  }
)

// sets the image data based on the current state
// TODO: use Suspense or Jotai's loadable atom
export const fetchImageAtom = atom(null, async (get, set) => {
  const model = get(modelAtom)
  const prompt = get(promptAtom)
  const negative_prompt = get(negativePromptAtom)
  const guidance_scale = get(guidanceScaleAtom)
  const num_inference_steps = get(inferenceStepsAtom)
  const [width, height] = get(sizeAtom)

  try {
    set(loadingAtom, true)
    set(errorAtom, null)
    const { data } = await huggingfaceFetch({
      model,
      prompt,
      height,
      width,
      negative_prompt,
      guidance_scale,
      num_inference_steps
    })
    set(imageUrlAtom, URL.createObjectURL(data))
  } catch (err: unknown) {
    const { statusText } = err as Response
    set(imageUrlAtom, null)
    set(errorAtom, new Error(statusText))
    console.error(statusText)
  } finally {
    set(loadingAtom, false)
  }
})
