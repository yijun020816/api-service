const { public: { apiUrl } } = useRuntimeConfig()

export function Url(path = '') {
  const baseUrl = process.env.NODE_ENV === 'development' ? `http://localhost` : process.env.NUXT_PUBLIC_API_URL
  return baseUrl + path
}
