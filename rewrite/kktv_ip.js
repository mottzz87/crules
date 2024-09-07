;(() => {
  console.log('KKTV 响应脚本执行')
  try {
    let originalBody = JSON.parse($response.body)
    console.log('原始响应体：', JSON.stringify(originalBody))

    let modifiedResponse = {
      status: {
        type: 'OK',
        subtype: null,
        message: null,
      },
      data: {
        country: 'TW',
        ip: '103.36.24.155',
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
