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
  headers?: HeadersInit
  icon: string
  disabled?: boolean
  // TODO: should be an array of sizes for each model
  max_height?: number
  max_width?: number
  models: string[]
  settings?: Setting[]
}

export interface Config {
  servers: Server[]
}

// const falModel = 'fal-ai/fast-sdxl'
// const stabilityModel = 'stable-diffusion-xl-1024-v1-0'

const config: Config = {
  servers: [
    {
      name: 'HuggingFace',
      icon: huggingFaceIcon,
      // TODO: size should be an array of sizes
      max_height: 1024,
      max_width: 1024,
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
      icon: falIcon,
      disabled: true,
      models: []
    },
    {
      name: 'Stability.ai (Coming Soon)',
      icon: stabilityIcon,
      disabled: true,
      models: []
    }
  ]
}

export default config
