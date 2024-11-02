;(() => {
  console.log('PIKPAK 响应脚本执行')
  const url = $request.url
  const hostname = new URL(url).hostname

  try {
    let originalBody = JSON.parse($response.body)
    console.log('原始响应体：', JSON.stringify(originalBody))

    let modifiedResponse

    if (hostname === 'api-drive.mypikpak.com') {
      if (url.indexOf('area_country_code') !== -1) {
        modifiedResponse = {
          data: {
            countryCode: 'KR',
            ip: '158.247.245.228',
          },
          redirect_uri: '',
          result: 'ACCEPTED',
          message: '',
        }
      }
    } else if (hostname === 'access.mypikpak.net') {
      if (url.indexOf('area_accessible') !== -1) {
        modifiedResponse = {
          accessible: true,
          countryCode: 'KR',
          ip: '158.247.245.228',
        }
      }
    }

    console.log('修改后的响应：', JSON.stringify(modifiedResponse))
    $done({ body: JSON.stringify(modifiedResponse) })
  } catch (error) {
    console.log('脚本执行出错：', error.message)
    $done({})
  }
})()
