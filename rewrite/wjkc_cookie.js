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

  try {
    // 解析请求体获取邮箱
    const requestBody = JSON.parse($request.body)
    const decodedData = atob(requestBody.data)
    const requestData = JSON.parse(decodedData)
    const email = requestData.email

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
