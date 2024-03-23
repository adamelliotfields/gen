export default [
  {
    children: '🌆 starry night',
    prompt:
      'Oil painting of a starry night, Van Gogh style, textured brushstrokes, deep blue night sky, swirling yellow stars',
    negative_prompt: 'people',
    guidance_scale: 7.5,
    num_inference_steps: 30,
    aspect_ratio_index: 2 // 1:1
  },
  {
    children: '🌌 space art',
    prompt:
      'Radiant nebula, star clusters and gas clouds shining brightly, celestial, otherworldly, astral photography, 16:9',
    negative_prompt: 'ugly',
    guidance_scale: 10,
    num_inference_steps: 40,
    aspect_ratio_index: 4 // 16:9
  },
  {
    children: '🧔‍♂️ future soldier',
    prompt:
      'Portrait of bearded man wearing a worn mech suit, futuristic, sharp focus, light bokeh, photorealistic',
    negative_prompt: 'helmet, bald',
    guidance_scale: 12.5,
    num_inference_steps: 50,
    aspect_ratio_index: 0 // 9:16
  },
  {
    children: '🐈 winter cat',
    prompt:
      'Gorgeous cat with medium-length orange hair and light-yellow eyes under falling snow looking at the camera, slow exposure, 8k',
    negative_prompt: 'lynx ears, collar',
    guidance_scale: 12.5,
    num_inference_steps: 50,
    aspect_ratio_index: 3 // 4:3
  }
]
