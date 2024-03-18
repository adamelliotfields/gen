import falIcon from './assets/fal.png'
import huggingFaceIcon from './assets/huggingface.png'
import stabilityIcon from './assets/stability.png'

// available settings for server (none for just server and prompt)
export enum Setting {
  SIZE = 'size',
  NEGATIVE_PROMPT = 'negative_prompt',
  GUIDANCE_SCALE = 'guidance_scale',
  INFERENCE_STEPS = 'inference_steps'
}

export interface Server {
  name: string
  endpoint: string
  headers?: HeadersInit
  icon: string
  disabled?: boolean
  max_height?: number // for calculating dimensions from aspect ratio
  max_width?: number
  models?: string[]
  settings?: Setting[]
}

export interface Config {
  servers: Server[]
}

const {
  VITE_FAL_URL,
  VITE_FAL_KEY,
  VITE_HF_URL,
  VITE_HF_KEY,
  VITE_STABILITY_URL,
  VITE_STABILITY_KEY
} = import.meta.env

const falModel = 'fal-ai/fast-sdxl'
const stabilityModel = 'stable-diffusion-xl-1024-v1-0'

let falEndpoint = VITE_FAL_URL ?? 'https://fal.run'
falEndpoint += `/${falModel}`

let stabilityEndpoint = VITE_STABILITY_URL ?? 'https://api.stability.ai'
stabilityEndpoint += `/v1/generation/${stabilityModel}/text-to-image`

const config: Config = {
  servers: [
    {
      name: 'HuggingFace',
      // TODO: this is currently for my custom server which uses a slightly different format than HuggingFace; will make it universal soon
      // endpoint: `${VITE_HF_URL ?? 'https://api-inference.huggingface.co'}/models/${huggingFaceModel}`,
      endpoint: VITE_HF_URL as string,
      icon: huggingFaceIcon,
      max_height: 1024,
      max_width: 1024,
      headers: {
        'X-Wait-For-Model': 'true',
        'X-Use-Cache': 'false'
      },
      models: ['stabilityai/stable-diffusion-xl-base-1.0'],
      settings: [
        Setting.SIZE,
        Setting.NEGATIVE_PROMPT,
        Setting.GUIDANCE_SCALE,
        Setting.INFERENCE_STEPS
      ]
    },
    {
      name: 'Fal.ai (Coming Soon)',
      endpoint: falEndpoint,
      icon: falIcon,
      disabled: true
    },
    {
      name: 'Stability.ai (Coming Soon)',
      endpoint: stabilityEndpoint,
      icon: stabilityIcon,
      disabled: true
    }
  ]
}

if (VITE_HF_KEY) {
  config.servers[0].headers = {
    Authorization: `Bearer ${VITE_HF_KEY}`
  }
}

if (VITE_FAL_KEY) {
  config.servers[1].headers = {
    Authorization: `Bearer ${VITE_FAL_KEY}`
  }
}

if (VITE_STABILITY_KEY) {
  config.servers[2].headers = {
    Authorization: `Bearer ${VITE_STABILITY_KEY}`
  }
}

export default config
