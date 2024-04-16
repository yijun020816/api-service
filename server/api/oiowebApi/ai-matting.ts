interface Query {
  file: file;
}

export default defineCachedEventHandler(async (event) => {
  const { file } = getQuery<Query>(event);
  if (!file)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/ai/matting?file=${file}`)).json();
});