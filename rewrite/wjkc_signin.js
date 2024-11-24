!(async () => {
  const COOKIE_KEY_PREFIX = 'CookieWJKC'

  // 获取账号映射
  const getAccountMap = () => {
    try {
      const mapStr = $persistentStore.read('WJKC_ACCOUNT_MAP')
      return JSON.parse(mapStr || '{}')
    } catch (e) {
      return {}
    }
  }

  // 签到函数
  const signIn = async (email, cookieKey) => {
    return new Promise((resolve, reject) => {
      const cookie = $persistentStore.read(cookieKey)
      if (!cookie) {
        reject('未登录')
        return
      }

      $httpClient.post(
        {
          url: 'https://wjkc123.com/api/user/sign_use',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Cookie: cookie,
            Origin: 'https://wjkc123.com',
            Referer: 'https://wjkc123.com/',
          },
          body: JSON.stringify({
            data: 'e30=',
          }),
        },
        (error, response, data) => {
          if (error) {
            reject('网络错误')
            return
          }

          try {
            const result = JSON.parse(data)
            if (result.data) {
              const decodedData = base64Decode(result.data)
              const responseObj = JSON.parse(decodedData)

              if (responseObj.code === 0) {
                resolve('签到成功')
              } else if (responseObj.msg === 'SIGN_USE_MULTY_TIMES') {
                resolve('今日已签到')
              } else if (responseObj.msg === 'UNLOGIN') {
                reject('未登录')
              } else {
                reject(responseObj.msg || '未知错误')
              }
            } else {
              reject('响应数据格式错误')
            }
          } catch (e) {
            reject('数据解析失败')
          }
        }
      )
    })
  }

  try {
    const accountMap = getAccountMap()
    const accounts = Object.entries(accountMap)
    const results = []

    for (const [email, cookieKey] of accounts) {
      try {
        let retryCount = 3
        while (retryCount > 0) {
          try {
            const result = await signIn(email, cookieKey)
            results.push(`${email}: ${result}`)
            break
          } catch (error) {
            if (error === '未登录') {
              results.push(`${email}: 未登录`)
              throw error
            }
            retryCount--
            if (retryCount === 0) {
              results.push(`${email}: ${error}`)
              throw error
            }
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
        }
        await new Promise(resolve => setTimeout(resolve, 3000))
      } catch (e) {
        // 错误已经添加到 results 中，这里不需要额外处理
      }
    }

    // 统一发送通知
    if (results.length > 0) {
      // 对结果进行分类和排序
      const sortedResults = results.sort((a, b) => {
        const order = {
          签到成功: 0,
          今日已签到: 1,
          网络错误: 2,
          未登录: 3,
        }

        const statusA = a.split(': ')[1]
        const statusB = b.split(': ')[1]

        return (order[statusA] ?? 2) - (order[statusB] ?? 2)
      })

      const title = 'WJKC 签到'
      const subtitle = `共 ${results.length} 个账号`
      const body = sortedResults.map(result => `• ${result}`).join('\n')
      $notification.post(title, subtitle, body)
    }
  } catch (e) {}

  $done()
})()

const base64Decode = str => {
  const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  str = str.replace(/=+$/, '')
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

  return result.replace(/\0+$/, '')
}
