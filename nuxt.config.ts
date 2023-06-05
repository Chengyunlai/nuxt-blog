// https://nuxt.com/docs/api/configuration/nuxt-config
import { siteConfig } from './site.config'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    //  https://content.nuxtjs.org/get-started
    '@nuxt/content',
    '@nuxtjs/stylelint-module',
  ],
  app: {
    rootId: 'nuxt-root',
    head: {
      title: "程云来的博客",
      meta: [
        { name: 'description', content: siteConfig.description },
        { name: 'author', content: siteConfig.author },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { charset: 'UTF-8' },
        { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
      ],
      noscript: [
        { children: 'JavaScript is required' },
      ],
      htmlAttrs: {
        lang: siteConfig.lang,
      },
      bodyAttrs: {
        class: 'font-sans',
      },
    },
  },
  content: {
    sources: {
      // github: {
      //   prefix: process.env.NUXT_GITHUB_PREFIX, // Prefix for routes used to query contents
      //   driver: 'github', // Driver used to fetch contents (view unstorage documentation)
      //   repo: process.env.NUXT_GITHUB_REPO,
      //   branch: process.env.NUXT_GITHUB_BRANCH,
      //   // dir: 'content', // Directory where contents are located. It could be a subdirectory of the repository.
      // },
    },
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'vitesse-light',
        // Theme used if `html.dark`
        dark: 'vitesse-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai',
      },
      preload: [
        'c',
        'cpp',
        'java',
      ],

    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/global.scss',
    '@/assets/styles/theme.css',
    '@/assets/styles/transition.css',
    '@/assets/styles/markdown.scss',
  ],
  stylelint: {
    /* module options */
    lintOnStart: false,
  },
  build: {
    analyze: true,
  },
  devServer: {
    port: 80,
  }
})
