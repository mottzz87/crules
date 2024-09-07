;(() => {
  console.log('脚本开始执行')

  if (typeof $request !== 'undefined' && $request) {
    console.log('这是一个请求')
    // 如果需要修改请求，可以在这里进行
    $done({})
  } else if (typeof $response !== 'undefined' && $response) {
    console.log('这是一个响应')
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
  } else {
    console.log('错误：既不是请求也不是响应')
    $done({})
  }
})()
