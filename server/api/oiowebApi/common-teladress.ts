interface Query {
  mobile: number;
}

export default defineCachedEventHandler(async (event) => {
  const { mobile } = getQuery<Query>(event);
  if (!mobile)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/common/teladress?mobile=${mobile}`)).json();
});