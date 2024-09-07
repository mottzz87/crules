;(() => {
  // 访问请求体（如果是 POST 请求）
  if ($request.body) {
    try {
      const bodyData = JSON.parse($request.body)
      console.log('请求体:', JSON.stringify(bodyData))

      // 使用请求体中的数据
      const title_id = bodyData.title_id || '01000718'
      const episode_id = bodyData.episode_id || '01000718010001'

      // 模拟的响应数据，使用请求中的一些参数
      const mockResponse = {
        status: {
          type: 'OK',
          subtype: null,
          message: null,
        },
        data: {
          user_id: 'c0a8eada-59e1-4f82-b145-73f5b0a061e1',
          device_id: '737eabc7-0930-4530-9824-56a0a42049d6',
          medium: 'SVOD',
          title_id: title_id,
          episode_id: episode_id,
          key_id: 'cfe9be4d03608d4769e45f177df436db',
          playback_token: 'c9f83cd42be24c749594781fbf277673b2f1c49dba3e437a9feec77dcdbede28',
          created_at: Math.floor(Date.now() / 1000),
          expires_at: Math.floor(Date.now() / 1000) + 86400 * 3000, // 30天后过期
        },
      }

      // 构造模拟的响应
      const response = {
        status: 200,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers':
            'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range',
          'Access-Control-Expose-Headers': 'Content-Length,Content-Range',
        },
        body: JSON.stringify(mockResponse),
      }

      console.log('返回模拟的响应:', JSON.stringify(mockResponse))
      $done({ response: response })
    } catch (error) {
      console.log('解析请求体时出错:', error.message)
      $done({})
    }
  } else {
    console.log('请求体为空')
    $done({})
  }
})()
