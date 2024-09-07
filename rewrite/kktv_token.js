;(() => {
  try {
    let originalBody = JSON.parse($response.body)
    console.log('111：', 111)
    console.log('222：', JSON.stringify({ test: 222 }))
    console.log('原始响应体：', JSON.stringify(originalBody))

    let modifiedResponse = {
      status: {
        type: 'OK',
        subtype: null,
        message: null,
      },
      data: originalBody.data
    }

    console.log('修改后的响应：', JSON.stringify(modifiedResponse))
    $done({ body: JSON.stringify(modifiedResponse) })
  } catch (error) {
    console.log('脚本执行出错：', error.message)
    $done({})
  }
})()
