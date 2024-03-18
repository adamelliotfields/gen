import clsx from 'clsx'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { type HTMLAttributes, type PropsWithChildren } from 'react'

import {
  errorAtom,
  guidanceScaleAtom,
  imageUrlAtom,
  inferenceStepsAtom,
  loadingAtom,
  modelAtom,
  negativePromptAtom,
  promptAtom,
  serverConfigAtom,
  sizeAtom
} from '../atoms'

import Container from './Container'
import Display from './Display'
import Examples from './Examples'
import Prompt from './Prompt'
import Settings from './Settings'

export default function Main({
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  const [loading, setLoading] = useAtom(loadingAtom)
  const setImageUrl = useSetAtom(imageUrlAtom)
  const setError = useSetAtom(errorAtom)

  // server and model
  const serverConfig = useAtomValue(serverConfigAtom)
  const model = useAtomValue(modelAtom)

  // settings
  const [width, height] = useAtomValue(sizeAtom)
  const guidance_scale = useAtomValue(guidanceScaleAtom)
  const num_inference_steps = useAtomValue(inferenceStepsAtom)
  const negative_prompt = useAtomValue(negativePromptAtom)

  // prompt
  const inputs = useAtomValue(promptAtom)

  const { endpoint } = serverConfig

  const handleClick = async () => {
    if (loading) return

    setLoading(true)
    try {
      // const headers = new Headers({ 'Content-Type': 'application/json' })
      // for (const [key, value] of Object.entries(serverConfig.headers ?? {})) {
      //   headers.append(key, value)
      // }

      const response = await fetch(endpoint as string, {
        // headers,
        method: 'POST',
        body: JSON.stringify({
          // TODO: this is currently for my custom server which uses a slightly different format than HuggingFace; will make it universal soon
          model,
          inputs,
          height,
          width,
          negative_prompt,
          guidance_scale,
          num_inference_steps
        })
      })
      if (response.ok) {
        const blob = await response.blob()
        setImageUrl(URL.createObjectURL(blob))
      } else {
        const text = await response.text()
        throw new Error(text)
      }
    } catch (error: unknown) {
      console.error(error)
      setImageUrl(null)
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  // https://dreamstudio.ai/prompt-guide
  return (
    <>
      <Container
        as="main"
        className="p-8 flex items-center justify-center max-h-[calc(100vh_-_280px)] md:max-h-[calc(100vh_-_364px)]"
        border
      >
        <Display />
      </Container>
      <footer
        className={clsx(
          'z-20 border-t border-neutral-300 dark:border-neutral-700',
          className
        )}
        {...rest}
      >
        <Container className="p-4 flex flex-col" border>
          <Examples />
          <Settings />
          <Prompt onClick={handleClick} />
        </Container>
      </footer>
    </>
  )
}
