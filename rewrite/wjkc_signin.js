!(async () => {
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
              const decodedData = atob(result.data)
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
            }
          } catch (e) {
            reject('解析失败')
          }
        }
      )
    })
  }

  // 处理所有账号
  const accountMap = getAccountMap()
  for (const [email, cookieKey] of Object.entries(accountMap)) {
    try {
      const result = await signIn(email, cookieKey)
      $notification.post('WJKC 签到', email, result)
      // 账号之间添加延迟
      await new Promise(resolve => setTimeout(resolve, 3000))
    } catch (e) {
      $notification.post('WJKC 签到', email, e)
    }
  }

  $done()
})()
