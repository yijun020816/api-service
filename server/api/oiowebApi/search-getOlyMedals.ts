
export default defineCachedEventHandler(async (event) => {
  
  return (await fetch(`https://api.oioweb.cn/api/search/getOlyMedals`)).json();
});