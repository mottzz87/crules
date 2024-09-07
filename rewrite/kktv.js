;(() => {
  console.log('脚本开始执行')

  if (typeof $request !== 'undefined') {
    console.log('这是一个请求脚本')
    $done({})
    return
  }

  if (typeof $response === 'undefined') {
    console.log('错误：$response 未定义')
    $done({})
    return
  }

  if (!$response.body) {
    console.log('错误：$response.body 为空')
    $done({})
    return
  }

  try {
    let originalBody = JSON.parse($response.body)
    console.log('原始响应体：', JSON.stringify(originalBody))

    let modifiedResponse = {
      data: {
        is_allowed: true,
      },
    }

    console.log('修改后的响应：', JSON.stringify(modifiedResponse))
    $done({ body: JSON.stringify(modifiedResponse) })
  } catch (error) {
    console.log('脚本执行出错：', error.message)
    $done({})
  }
})()
