interface Query {
  qq: string
}

export default defineCachedEventHandler(async (event) => {
  const { qq } = getQuery<Query>(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'QQ不能为空' })

  const res = await fetch(`https://api.oioweb.cn/api/qq/info?qq=${qq}`, {
    method: 'GET',
  })
  return res.json()
}, {
  maxAge: 60 * 60,
})
