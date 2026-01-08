// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  $meta: {
    name: 'NBC' // 指定layer命名
  },
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/ui', '@nuxtjs/i18n'],
  css: [join(currentDir, './app/assets/css/main.css')],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: [
      { code: 'en', name: 'English', files: ['en.js', 'common.en.js'], alias: 'En' },
      { code: 'zh-CN', name: '简体中文', files: ['zh-CN.js', 'common.zh-CN.js'], alias: '中' }
    ]
  }
})
