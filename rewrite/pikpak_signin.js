;(() => {
  const url = 'https://api-drive.mypikpak.com/vip/v1/activity/rewardVip'
  const auth = $argument // 获取传入的pikpak_auth参数

  if (!auth) {
    console.log('Authorization信息未配置')
    $notification.post('PIKPAK 签到', '配置错误', 'Authorization信息未配置')
    $done()
    return
  }

  const headers = {
    Authorization: auth,
  }
  const body = JSON.stringify({ type: 'sign_in' })

  const request = {
    url: url,
    method: 'POST',
    headers: headers,
    body: body,
  }

  $httpClient.post(request, (error, response, data) => {
    if (error) {
      console.log('请求失败：', error)
      $notification.post('PIKPAK 签到', '请求失败', error)
      $done()
      return
    }

    try {
      const result = JSON.parse(data)
      if (result.updated) {
        $notification.post('PIKPAK 签到', '', '您已成功签到')
      } else {
        $notification.post('PIKPAK 签到', '', '今日您已经签过啦！')
      }
    } catch (e) {
      console.log('解析响应失败：', e)
      $notification.post('PIKPAK 签到', '解析响应失败', e.message)
    }
    $done()
  })
})()
