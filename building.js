import fs from 'node:fs'

function prerenderRoutes() { // 预渲染路由 加快访问速度
  // 读取根目录下的content下的docs文件夹下的所有json文件
  const files = fs.readdirSync('./content/docs')
  // 过滤出json文件
  const jsonFiles = files.filter(file => file.endsWith('.json'))
  const routes = jsonFiles.map((file) => {
    return `/docs/${file.replace('.json', '')}`
  })
  routes.push('/')
  //   将routes写入到根目录下的content下的build/routes.json文件中
  fs.writeFileSync('./content/build/routes.json', JSON.stringify(routes))
}

prerenderRoutes()
