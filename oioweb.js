import fs from 'node:fs'
import url from 'node:url'
import cheerio from 'cheerio'
import axios from 'axios'

// 获取url 参数
function getUrlParams(urlString) {
  const parsedUrl = new URL(urlString)
  const params = {}
  parsedUrl.searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

// 获取id
function extractApiKeys(urlString) {
  // 使用url模块解析URL
  // eslint-disable-next-line node/no-deprecated-api
  const parsedUrl = url.parse(urlString, true)

  // 获取问号前面的部分
  const baseUrl = parsedUrl.pathname.split('?')[0]

  // 获取api/后面的字符串
  const apiPart = baseUrl.split('api/')[1]

  // 将斜杠替换为短横线
  const replacedApiPart = apiPart.replace(/\//g, '-')

  return replacedApiPart
}

// 生成api ts 文件
function generateApiTs(id, url, params) {
  // 生成请求参数的类型定义
  const generateInterface = () => {
    if (params.length === 0)
      return ''
    let interfaceCode = 'interface Query {\n'
    params.forEach((item) => {
      interfaceCode += `  ${item.key}: ${item.type};\n`
    })
    interfaceCode += '}\n'
    return interfaceCode
  }
  // 生成请求url
  const generateUrl = () => {
    if (params.length === 0)
      return `\`${url}\``

    // eslint-disable-next-line no-new-wrappers
    let fetchUrl = `${new String(url)}?`
    params.forEach((item) => {
      fetchUrl += `${item.key}=\${${item.key}}&`
    })
    // 删除最后一个&
    fetchUrl = fetchUrl.substring(0, fetchUrl.length - 1)
    return `\`${fetchUrl}\``
  }

  // 生成请求验证
  const generateVerify = () => {
    if (params.length === 0)
      return '\n'

    // 获取参数
    const getQuery = () => {
      const keys = []
      params.forEach((item) => {
        keys.push(item.key)
      })
      return keys
    }
    const keys = getQuery()
    return `const { ${keys.join(',')} } = getQuery<Query>(event);\n  if (${keys.map(item => `!${item}`).join(',')})\n    throw createError({ statusCode: 400, message: '参数错误' });\n`
  }

  const Code = `${generateInterface(params)}\nexport default defineCachedEventHandler(async (event) => {\n  ${generateVerify()}  return (await fetch(${generateUrl()})).json();\n});`
  return Code
}

// 查询接口文档的详情
async function getApiDetail(url) {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  const name = $('legend').text()
  const desc = $('.layui-elem-quote').text()
  // 接口地址
  const apiUrl = $('.url').eq(0).attr('data-clipboard-text')
  // 获取返回格式
  const returnFormat = $('.url').eq(1).text()
  // 获取请求方法
  const method = $('.url').eq(2).text()
  // 提取请求示例
  const requestExample = $('.url').eq(3).attr('data-clipboard-text')
  // 提取请求参数说明
  const requestParameters = []
  const UrlParams = getUrlParams(requestExample)
  $('.layui-table').eq(0).each((index, element) => {
    const key = $(element).find('td').eq(0).text().trim()
    const required = $(element).find('td').eq(1).text().trim() === '是'
    const type = $(element).find('td').eq(2).text().trim()
    const desc = $(element).find('td').eq(3).text().trim()
    if (!key || !type || !desc)
      return
    requestParameters.push({ key, type, value: UrlParams[key], desc, required })
  })
  // 接口id
  const id = extractApiKeys(apiUrl)

  // doc json
  const docJosn = {
    id: `oiowebApi-${id}`,
    name,
    desc,
    path: `/api/oiowebApi/${id}`,
    method,
    params: requestParameters,
    dataType: returnFormat,
  }
  const tsContent = generateApiTs(id, apiUrl, requestParameters)
  // 入到根目录下的apis文件夹下 文件名为id+.ts
  fs.writeFileSync(`./server/api/oiowebApi/${id}.ts`, tsContent)
  fs.writeFileSync(`./content/tripartite-apis/${id}.json`, JSON.stringify(docJosn, null, 4))
}

async function init() {
  // 获取接口数据源
  // const arr = []
  const res = await axios.get('https://api.oioweb.cn/libraries')
  for (let i = 0; i < res.data.result.length; i++)
    await getApiDetail(`https://api.oioweb.cn/doc/${res.data.result[i].router}`)

  // fs.writeFileSync(`./content/tripartite-apis/apis.json`, JSON.stringify(arr, null, 4))
}

init()
