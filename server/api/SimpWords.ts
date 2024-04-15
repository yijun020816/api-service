export default defineCachedEventHandler(async () => {
  return (await fetch(`https://api.oioweb.cn/api/SimpWords`)).json()
})
