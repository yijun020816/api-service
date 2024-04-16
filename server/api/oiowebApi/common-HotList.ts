
export default defineCachedEventHandler(async (event) => {
  
  return (await fetch(`https://api.oioweb.cn/api/common/HotList`)).json();
});