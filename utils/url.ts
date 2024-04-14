const { public: { apiUrl } } = useRuntimeConfig()

export function Url(path = '') {
  const NUXT_PORT: string = process.env.NUXT_PORT ? process.env.NUXT_PORT : '3000'
  const baseUrl = process.env.NODE_ENV === 'development' ? `http://localhost:${NUXT_PORT}` : apiUrl

  return new URL(path, baseUrl)
}
