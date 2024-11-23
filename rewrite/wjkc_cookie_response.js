!(async () => {
  try {
    // 读取临时存储的账号信息
    const tempData = JSON.parse($persistentStore.read('WJKC_TEMP') || '{}')
    const { email, cookieKey } = tempData

    if (!email || !cookieKey) {
      $notification.post('WJKC Cookie', '错误', '未找到账号信息')
      $done({})
      return
    }

    if (!$response) {
      $notification.post('WJKC Cookie', '响应错误', '未找到响应数据')
      $done({})
      return
    }

    const headers = $response.headers
    const setCookie = headers['Set-Cookie'] || headers['set-cookie']
    if (!setCookie) {
      $notification.post('WJKC Cookie', '获取失败', '响应头中未找到Set-Cookie')
      $done({})
      return
    }

    const tokenMatch = setCookie.match(/token=([^;]+)/)
    if (!tokenMatch) {
      $notification.post('WJKC Cookie', '提取失败', 'Cookie中未找到token')
      $done({})
      return
    }

    const token = tokenMatch[1]
    const cookie = `platform=macOS; not-show-notice-dialog1d-v4=not-show-notice-dialog; token=${token}`

    // 保存 Cookie
    await $persistentStore.write(cookie, cookieKey)
    $notification.post('WJKC Cookie', '保存成功', `账号: ${email}\n键名: ${cookieKey}`)
  } catch (e) {
    $notification.post('WJKC Cookie', '响应处理错误', e.message)
  }

  $done({})
})()
