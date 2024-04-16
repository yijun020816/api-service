interface Query {
  name: string;
}

export default defineCachedEventHandler(async (event) => {
  const { name } = getQuery<Query>(event);
  if (!name)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/common/rubbish?name=${name}`)).json();
});