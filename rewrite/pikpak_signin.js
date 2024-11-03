;(() => {
  // const accounts_0 = JSON.parse($argument) // 获取传入的账号信息

  console.log('1111111111111', $argument)
  const accounts = 'nclarka875@gmail.com, nclarka876@gmail.com'.split(',')
  const password = '8c8uSUp6y6LFyZG'

  const delay = 3000 // 每个请求之间的延迟时间（毫秒）

  const signIn = (email, password) => {
    const initUrl = 'https://user.mypikpak.com/v1/auth/init'
    const signInUrl = 'https://user.mypikpak.com/v1/auth/signin'
    const rewardUrl = 'https://api-drive.mypikpak.com/vip/v1/activity/rewardVip'

    const initBody = JSON.stringify({
      client_id: 'YUMx5nI8ZU8Ap8pm',
      action: 'POST:/v1/auth/signin',
      device_id: '6b4d663f25d44b0881b9de0e5d1a471f',
      captcha_token:
        'ck0.wopiPcBhcsNB2avQwNwqWoqHNms0QscghpT6MogC68ydctM1lUhQDgko6H7eWAFGsWimx_CEgwzCr930wSjGA_noJjJ3fHwDlA4mXepTFv4djscRwi4tlFyUTuLbydBnXgtHHF_4VwjpH3SmzMeLaWzRWT9HAkRj-vCZFnkUeJkzoZ8aMaDfaGpoxKzb4n7eW8KvwOJKFgMgNj5OG5ilQw.ClAInt3nlq8yEhBZVU14NW5JOFpVOEFwOHBtGgUyLjAuMCIMbXlwaWtwYWsuY29tKiA2YjRkNjYzZjI1ZDQ0YjA4ODFiOWRlMGU1ZDFhNDcxZhKAAQhSaG5vNbbRMmvck943KnUbADT0mz_2hzp5R828sDqSqs3B6W4FMvfTgh6e4JxxMQRjYZPeLvzzWaqkJY4tJolHItGSrHjDNARCNKgyLL2UKVzrOakcLCT-yoztobUqq_AFlYFaNH_S7VJ_2EoEgxIiiDzL67H2SnYVcghbUiWz', // 需要替换为实际的captcha_token
      meta: { email: email },
    })

    console.log(3333, '-----')

    $httpClient.post(
      {
        url: initUrl,
        headers: { 'Content-Type': 'application/json' },
        body: initBody,
      },
      (initError, initResponse, initData) => {
        if (initError) {
          console.log(`初始化请求失败：${initError}`)
          $notification.post('PIKPAK 签到', '初始化失败', initError)
          return
        }
        const initResult = JSON.parse(initData)
        const captchaToken = initResult.captcha_token
        console.log(44444, '-----', captchaToken)

        if (!captchaToken) {
          console.log('未能获取到captcha_token')
          $notification.post('PIKPAK 签到', '获取captcha_token失败', '未能获取到captcha_token')
          return
        }

        const signInBody = JSON.stringify({
          client_id: 'YUMx5nI8ZU8Ap8pm',
          username: email,
          password: password,
          captcha_token: captchaToken,
        })

        $httpClient.post(
          {
            url: signInUrl,
            headers: {
              'Content-Type': 'application/json',
              'x-captcha-token': captchaToken,
              'x-device-id': '6b4d663f25d44b0881b9de0e5d1a471f',
              'x-device-name': 'PC-Chrome',
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
            },
            body: signInBody,
          },
          (signInError, signInResponse, signInData) => {
            if (signInError) {
              console.log(`登录请求失败：${signInError}`)
              $notification.post('PIKPAK 签到', '登录失败', signInError)
              return
            }

            const signInResult = JSON.parse(signInData)
            const authToken = `${signInResult.token_type} ${signInResult.access_token}`

            if (!authToken) {
              console.log('未能获取到authToken')
              $notification.post('PIKPAK 签到', '获取authToken失败', '未能获取到authToken')
              return
            }

            $httpClient.post(
              {
                url: rewardUrl,
                headers: {
                  Authorization: authToken,
                  'x-device-id': '6b4d663f25d44b0881b9de0e5d1a471f',
                  'x-device-name': 'PC-Chrome',
                  'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
                },
                body: JSON.stringify({ type: 'sign_in' }),
              },
              (rewardError, rewardResponse, rewardData) => {
                if (rewardError) {
                  console.log(`签到请求失败：${rewardError}`)
                  $notification.post('PIKPAK 签到', '签到失败', rewardError)
                  return
                }

                const rewardResult = JSON.parse(rewardData)
                if (rewardResult.updated) {
                  $notification.post('PIKPAK 签到', '签到成功', `账号 ${email} 已成功签到`)
                } else {
                  $notification.post('PIKPAK 签到', '签到失败', `账号 ${email} 已经签过了！`)
                }
              }
            )
          }
        )
      }
    )
  }

  accounts.forEach((account, index) => {
    setTimeout(() => {
      signIn(account, password)
      console.log(22222, '-----', account, '-----', password)
    }, delay)
  })
  console.log('1000000')
})()
