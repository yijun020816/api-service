export function Url(path = '') {
  const baseUrl = process.env.NODE_ENV === 'development' ? `http://localhost` : 'https://api.yijun.fun'
  return baseUrl + path
}
