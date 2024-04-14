const { public: { apiUrl } } = useRuntimeConfig()

export function Url(path = '') {
  const baseUrl = process.env.NODE_ENV === 'development' ? `http://localhost` : apiUrl
  return baseUrl + path
}
