interface Query {
  keyword: string;
}

export default defineCachedEventHandler(async (event) => {
  const { keyword } = getQuery<Query>(event);
  if (!keyword)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/search/trademark?keyword=${keyword}`)).json();
});