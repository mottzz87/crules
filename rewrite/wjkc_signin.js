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

    for (const [email, cookieKey] of accounts) {
      try {
        let retryCount = 3
        while (retryCount > 0) {
          try {
            const result = await signIn(email, cookieKey)
            $notification.post('WJKC 签到', email, result)
            break
          } catch (error) {
            retryCount--
            if (retryCount === 0) throw error
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
        }
        await new Promise(resolve => setTimeout(resolve, 3000))
      } catch (e) {
        $notification.post('WJKC 签到', email, e.toString())
      }
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
