import routers from './content/build/routes.json'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/content',
    '@nuxt/ui',
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      ],

    },
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai',
      },
    },
  },
  tailwindcss: {
    exposeConfig: true,
    config: {
      content: [
        'content/**/**.md',
      ],
    },
  },
  ui: {
    icons: ['mdi', 'carbon'],
  },
  colorMode: {
    classSuffix: '',
  },
  css: [
    '~/assets/css/main.css',
  ],
  nitro: {
    storage: {
      db: {
        driver: 'redis',
        port: 11121,
        username: 'default',
        password: 'ZCpKCgKaBrkWifGdgCQGBl4Fy260CqlF',
        host: 'redis-11121.c11.us-east-1-3.ec2.cloud.redislabs.com',
      },
    },
    prerender: {
      routes: ['/'],
    },
  },
  experimental: {
    typedPages: true,
    asyncContext: true,
  },
  devServer: {
    port: 80,
  },
  devtools: { enabled: true },
})
