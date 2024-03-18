# gen

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/adamelliotfields/gen?devcontainer_path=.devcontainer/devcontainer.json&machine=basicLinux32gb)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://pr.new/adamelliotfields/gen)

My image generation web UI, hosted on GitHub Pages: [aef.me/gen](https://aef.me/gen/)

## Features

- [x] Stable Diffusion XL text-to-image via 🤗 [Inference API](https://huggingface.co/docs/api-inference/en/index)
- [x] Supports different image sizes, guidance scale, steps, and negative prompt
- [x] Examples!

## TODO

- [ ] Embed mode like [JupyterLite REPL](https://jupyter.org/try-jupyter/repl/?kernel=python)
- [ ] Multiple backends (stability.ai, fal.ai, etc)
- [ ] More models
- [ ] Image-to-image tasks
- [ ] API key input

## Usage

```sh
# install bun
export PATH="${HOME}/.bun/bin:${PATH}"
curl -fsSL https://bun.sh/install | bash

# install deps
bun install

# start the dev server
bun start
```

## Secrets

- `VITE_FAL_URL` - Alternate URL (proxy) for the Fal.ai API (default: `https://fal.run`)
- `VITE_FAL_KEY` - Fal.ai API key (default: `undefined`)
- `VITE_HF_URL` - Alternate URL (proxy) for the Hugging Face API (default: `https://api-inference.huggingface.co`)
- `VITE_HF_KEY` - Hugging Face API key (default: `undefined`)
- `VITE_STABILITY_URL` - Alternate URL (proxy) for the Stability.ai API (default: `https://api.stability.ai`)
- `VITE_STABILITY_KEY` - Stability.ai API key (default: `undefined`)

See [`.env`](./.env) for app settings. You can put the above in `.env.local` during development.
