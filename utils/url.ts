export function Url(path = '') {
  const baseUrl = process.env.NODE_ENV === 'development' ? `http://localhost` : 'https://service.yijun.fun'
  return baseUrl + path
}
