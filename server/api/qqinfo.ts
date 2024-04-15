interface Query {
  qq: string
}

export default defineCachedEventHandler(async (event) => {
  const { qq } = getQuery<Query>(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'QQ不能为空' })
  return (await fetch(`https://api.oioweb.cn/api/qq/info?qq=${qq}`)).json()
})