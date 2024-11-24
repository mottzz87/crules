!(async () => {
  const COOKIE_KEY_PREFIX = 'CookieWJKC'

  // 获取现有的账号映射
  const getAccountMap = () => {
    try {
      const mapStr = $persistentStore.read('WJKC_ACCOUNT_MAP')
      return JSON.parse(mapStr || '{}')
    } catch (e) {
      return {}
    }
  }

  // 重新整理所有键名
  const reorganizeKeys = (map, currentEmail) => {
    const emails = [...new Set([...Object.keys(map), currentEmail])]
    const newMap = {}

    // 按邮箱排序，确保顺序一致
    emails.sort().forEach((email, index) => {
      newMap[email] = index === 0 ? COOKIE_KEY_PREFIX : `${COOKIE_KEY_PREFIX}${index}`
    })

    return newMap
  }

  const base64Decode = str => {
    if (typeof atob === 'function') {
      return atob(str)
    }

    // 自定义解码
    const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    str = str.replace(/[^A-Za-z0-9+/=]/g, '')
    let result = ''

    for (let i = 0; i < str.length; i += 4) {
      const c1 = base64chars.indexOf(str[i] || 'A')
      const c2 = base64chars.indexOf(str[i + 1] || 'A')
      const c3 = base64chars.indexOf(str[i + 2] || 'A')
      const c4 = base64chars.indexOf(str[i + 3] || 'A')

      result += String.fromCharCode(
        (c1 << 2) | (c2 >> 4),
        ((c2 & 15) << 4) | (c3 >> 2),
        ((c3 & 3) << 6) | c4
      )
    }

    return result.replace(/[^\x20-\x7E]/g, '')
  }

  try {
    let requestBody
    try {
      if (typeof $request.body === 'string') {
        requestBody = JSON.parse($request.body)
      } else if (typeof $request.body === 'object') {
        requestBody = $request.body
      } else {
        throw new Error(`意外的请求体类型: ${typeof $request.body}`)
      }
    } catch (parseError) {
      throw new Error('请求数据格式错误')
    }

    if (!requestBody || !requestBody.data) {
      throw new Error('请求数据缺少data字段')
    }

    const decodedData = base64Decode(requestBody.data)
    let requestData
    try {
      requestData = JSON.parse(decodedData)
    } catch (parseError) {
      throw new Error('解码数据格式错误')
    }

    const email = requestData.email
    if (!email) {
      throw new Error('未找到邮箱信息')
    }

    // 获取并重新整理映射
    const accountMap = getAccountMap()
    const newMap = reorganizeKeys(accountMap, email)

    // 保存新的映射
    $persistentStore.write(JSON.stringify(newMap), 'WJKC_ACCOUNT_MAP')

    // 获取当前邮箱的键名
    const cookieKey = newMap[email]

    // 保存账号信息到临时存储
    $persistentStore.write(JSON.stringify({ email, cookieKey }), 'WJKC_TEMP')

    $notification.post('WJKC Cookie', '更新成功', `账号: ${email}`)
  } catch (e) {
    $notification.post('WJKC Cookie', '更新失败', e.message)
  }

  $done({})
})()
