interface Query {
  group: number;
}

export default defineCachedEventHandler(async (event) => {
  const { group } = getQuery<Query>(event);
  if (!group)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/qq/group_info?group=${group}`)).json();
});