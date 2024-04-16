interface Query {
  url: string;
}

export default defineCachedEventHandler(async (event) => {
  const { url } = getQuery<Query>(event);
  if (!url)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/site/UrlRevert?url=${url}`)).json();
});