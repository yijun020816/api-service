interface Query {
  qq: number;
}

export default defineCachedEventHandler(async (event) => {
  const { qq } = getQuery<Query>(event);
  if (!qq)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/qq/getQQLevelInfo?qq=${qq}`)).json();
});