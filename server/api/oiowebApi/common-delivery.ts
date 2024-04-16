interface Query {
  nu: string;
}

export default defineCachedEventHandler(async (event) => {
  const { nu } = getQuery<Query>(event);
  if (!nu)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/common/delivery?nu=${nu}`)).json();
});