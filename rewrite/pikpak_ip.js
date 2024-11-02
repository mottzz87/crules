;(() => {
  console.log('PIKPAK 响应脚本执行')
  try {
    let originalBody = JSON.parse($response.body)
    console.log('原始响应体：', JSON.stringify(originalBody))

    let modifiedResponse = {
      data: {
        countryCode: 'KR',
        ip: '158.247.245.228',
      },
      redirect_uri: '',
      result: 'ACCEPTED',
      message: '',
    }

    console.log('修改后的响应：', JSON.stringify(modifiedResponse))
    $done({ body: JSON.stringify(modifiedResponse) })
  } catch (error) {
    console.log('脚本执行出错：', error.message)
    $done({})
  }
})()
