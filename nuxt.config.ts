import fs from 'node:fs'

function prerenderRoutes() { // 预渲染路由 加快访问速度
  // 读取根目录下的content下的docs文件夹下的所有json文件
  const files = fs.readdirSync('./content/docs')
  // 过滤出json文件
  const jsonFiles = files.filter(file => file.endsWith('.json'))
  const routes = jsonFiles.map((file) => {
    return `/docs/${file.replace('.json', '')}`
  })
  routes.push('/')
  return routes as string[]
}

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
      routes: prerenderRoutes(),
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
