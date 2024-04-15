interface Query {
  domain: string
}

export default defineCachedEventHandler(async (event) => {
  const { domain } = getQuery<Query>(event)

  if (!domain)
    throw createError({ statusCode: 400, message: '域名不能为空' })
  return (await fetch(`https://api.oioweb.cn/api/site/icp?domain=${domain}`)).json()
})
