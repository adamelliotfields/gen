import containers from '@tailwindcss/container-queries'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: [containers, forms, typography],
  theme: { extend: {} }
}

export default config
