import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://jonaszeihe.github.io',
  base: '/kyon',
  integrations: [mdx(), react()],
})
