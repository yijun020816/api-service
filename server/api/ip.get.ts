export default defineEventHandler(async (event) => {
  const ip = getIP(event.node.req)

  return ip
})
