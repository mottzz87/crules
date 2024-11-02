;(() => {
  const url = 'https://api-drive.mypikpak.com/vip/v1/activity/rewardVip'
  const headers = {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImNmZmExODE3LWI1YWItNDc2ZS1hYWMzLWU2OWE2NjAyMmJlOSJ9.eyJpc3MiOiJodHRwczovL3VzZXIubXlwaWtwYWsuY29tIiwic3ViIjoiWnlYVl9oSURhVmdqVHhjRCIsImF1ZCI6IllVTXg1bkk4WlU4QXA4cG0iLCJleHAiOjE3MzA1Nzk0NzYsImlhdCI6MTczMDU3MjI3NiwiYXRfaGFzaCI6InIuTnMwSkdYUHBTaE9jelI1N2REVW43ZyIsInNjb3BlIjoidXNlciBwYW4iLCJwcm9qZWN0X2lkIjoiMndrczU2YzMxZGM4MHN4bTVwOSIsIm1ldGEiOnsiYSI6IjNicEk3QTMzU3BRcTNFTHZYWVRZTUxSSmdMZ2xCSHZnc3BiYnFlM3kyaUU9In19.YvKvCmqUN45NLknEHft5G6w5ys9GaOxtsM93eXtBb4oHJ1vVAcTFQYSj5zMY1MrQgQ0ZxsTqWpBTtkMUMrRbixo7H6f7xjQxLcN03tGMBGplTA94dR5r6FGJPoS-GluK0ZLQzBBHnJHvmFiJj_08_ldfX6Iun4JcbULd69uOTQqBEe-mFUYJPYSbl2OZFoR1LyZfLoOmyXC3c7ZXYe_jK2IKmmEd2s-Wuz092rZphAQNoH-z2ErK9hHcA3IlyaIXtDNb6KqkObMeQOSiLOxsaKYb9shpOn1r6J3P6ALfXzrO4z4ECLsrVDxwY_Zpg83k6fLE25YxU2Czx7eSlNsnhg',
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
        $notification.post('PIKPAK 签到', '签到成功', '您已成功签到')
      } else {
        $notification.post('PIKPAK 签到', '签到失败', '今日已经签到过了！')
      }
    } catch (e) {
      console.log('解析响应失败：', e)
      $notification.post('PIKPAK 签到', '解析响应失败', e.message)
    }
    $done()
  })
})()
