interface Query {
  lng: string;
}

export default defineCachedEventHandler(async (event) => {
  const { lng } = getQuery<Query>(event);
  if (!lng)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/ip/geocoder?lng=${lng}`)).json();
});