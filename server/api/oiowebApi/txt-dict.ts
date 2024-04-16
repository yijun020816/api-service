interface Query {
  text: string;
}

export default defineCachedEventHandler(async (event) => {
  const { text } = getQuery<Query>(event);
  if (!text)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/txt/dict?text=${text}`)).json();
});