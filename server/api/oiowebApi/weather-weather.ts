interface Query {
  city_name: string;
}

export default defineCachedEventHandler(async (event) => {
  const { city_name } = getQuery<Query>(event);
  if (!city_name)
    throw createError({ statusCode: 400, message: '参数错误' });
  return (await fetch(`https://api.oioweb.cn/api/weather/weather?city_name=${city_name}`)).json();
});