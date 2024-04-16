interface Query {
  phone: number;
}

export default defineCachedEventHandler(async (event) => {
  const { phone } = getQuery<Query>(event);
  if (!phone)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/search/harassPhone?phone=${phone}`)).json();
});