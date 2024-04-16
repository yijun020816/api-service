interface Query {
  domain: string;
}

export default defineCachedEventHandler(async (event) => {
  const { domain } = getQuery<Query>(event);
  if (!domain)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/site/employ?domain=${domain}`)).json();
});