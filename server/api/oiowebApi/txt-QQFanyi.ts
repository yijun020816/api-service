interface Query {
  sourceText: string;
}

export default defineCachedEventHandler(async (event) => {
  const { sourceText } = getQuery<Query>(event);
  if (!sourceText)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/txt/QQFanyi?sourceText=${sourceText}`)).json();
});