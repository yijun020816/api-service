export default defineCachedEventHandler(async (_event) => {
  // http://api.help.bj.cn/
  const data = await (await fetch('https://api.oioweb.cn/api/weather/GetWeather')).json()

  return data
})
