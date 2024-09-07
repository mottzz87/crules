;(() => {
  try {
    let originalBody = JSON.parse($response.body)
    console.log('111：', 111)
    console.log('222：', JSON.stringify({test: 222}))
    console.log('原始响应体：', JSON.stringify(originalBody))

    let modifiedResponse = {
      "status": {
          "type": "OK",
          "subtype": null,
          "message": null
      },
      "data": {
          "user_id": "c0a8eada-59e1-4f82-b145-73f5b0a061e1",
          "device_id": "",
          "medium": "SVOD",
          "title_id": "01000718",
          "episode_id": "01000718010001",
          "key_id": "1f386559d3244cb815ccf0aabd6fef0b",
          "playback_token": "7ff6c5ae89fc4881803a9b9c28a8675978db9f6531d74828a175cca89c276eea",
          "created_at": 1725714319,
          "expires_at": 1725800719
      }
  }

    console.log('修改后的响应：', JSON.stringify(modifiedResponse))
    $done({ body: JSON.stringify(modifiedResponse) })
  } catch (error) {
    console.log('脚本执行出错：', error.message)
    $done({})
  }
})()
