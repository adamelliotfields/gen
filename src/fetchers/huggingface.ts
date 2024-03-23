import axios from 'redaxios'

const { VITE_HF_KEY, VITE_HF_URL, VITE_SECRET } = import.meta.env

export interface HuggingFaceConfig {
  model: string
  prompt: string
  height: number
  width: number
  negative_prompt: string
  guidance_scale: number
  num_inference_steps: number
}

export default async function huggingface({
  model,
  prompt,
  height,
  width,
  negative_prompt,
  guidance_scale,
  num_inference_steps
}: HuggingFaceConfig) {
  const url = VITE_HF_URL ?? 'https://api-inference.huggingface.co'
  const endpoint = `${url}/models/${model}`

  return axios.post(
    endpoint,
    {
      inputs: prompt,
      parameters: {
        height,
        width,
        negative_prompt,
        guidance_scale,
        num_inference_steps
      }
    },
    {
      responseType: 'blob',
      headers: {
        Authorization: VITE_HF_KEY
          ? `Bearer ${VITE_HF_KEY}`
          : (undefined as unknown as string),
        'Content-Type': 'application/json',
        'X-Use-Cache': 'false',
        'X-Wait-For-Model': 'true',
        'X-Api-Key': VITE_SECRET ?? undefined
      }
    }
  )
}
