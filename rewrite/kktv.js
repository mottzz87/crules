;(() => {
  try {
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

    let response = {
      data: {
        is_allowed: true,
      },
    }

    console.log('修改后的响应：', JSON.stringify(response))
    $done({ body: JSON.stringify(response) })
  } catch (error) {
    console.log('脚本执行出错：', error.message)
    $done({})
  }
})()
