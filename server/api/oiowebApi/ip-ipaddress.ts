interface Query {
  ip: string;
}

export default defineCachedEventHandler(async (event) => {
  const { ip } = getQuery<Query>(event);
  if (!ip)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/ip/ipaddress?ip=${ip}`)).json();
});