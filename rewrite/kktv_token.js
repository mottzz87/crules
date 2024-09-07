(() => {
  console.log('开始执行脚本');
  
  // 模拟的响应数据
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
      title_id: '01000718',
      episode_id: '01000718010001',
      key_id: '1f386559d3244cb815ccf0aabd6fef0b',
      playback_token: '7ff6c5ae89fc4881803a9b9c28a8675978db9f6531d74828a175cca89c276eea',
      created_at: Math.floor(Date.now() / 1000),
      expires_at: Math.floor(Date.now() / 1000) + 86400, // 24小时后过期
    },
  };

  console.log('返回模拟的响应');
  $done({ response: { 
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mockResponse)
  }});
})();
