/*************************************

项目名称：Moji辞书-日语学习词典
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.mojidict\.com\/parse\/functions\/(getNPrivileges|getUserAsset) url script-response-body https://raw.githubusercontent.com/mottzz87/crules/main/rewrite/mojics.js

[mitm]
hostname = api.mojidict.com

*************************************/

var chxm1023 = JSON.parse($response.body)
const url = $request.url
const vip = '/getNPrivileges-v2'
const vip1 = '/getNPrivileges'
const vip2 = '/getUserAsset'
if (url.indexOf(vip2) != -1) {
  chxm1023.result = {
    result: {
      userId: 'NnEJUH8eHT',
      asset: {
        mo_point: 9999999999999,
        mo_coin: 9999999999999,
        cash_wallet: 9999999999999,
      },
      quota: 9999999999999,
      moCoin_rate_of_quota: 50,
    },
    code: 200,
  }
} else if (url.indexOf(vip) != -1) {
  chxm1023.result = {
    result:
      // '091a0d45e4c8acc99ed9fd4db5bb315ed814854f0257340c94a8f5f517d1db0bf1e888390204957b6fd374fdb4c4d31353aa1cc6d0e69a3e64d031fdb5948a7d694effcbe437718f5aac8cfe793ff3fe6fda5bc846c920dfa2482e4dc2217e2de5e5fd46fc4fc796ced957550309bbe44edd7b8678bc95ed204a5c6afd7b4de0121fdde4ef20014d575f368320d97e2ecda156473a6982be17b644e5124e929ad4fe246a295e813b0374669e17ec6141b6b7890020980107d3ec75399f4890b750798a346dd7b3053c567af95a09fd0693fce168befe76fac98301a30058f69af1d5d60ae13892d7f4fd5e5c4144897d',
      '091a0d45e4c8acc99ed9fd4db5bb315e0bb4fc9b6a313fe1d7168a204ff3d7de9ffe4816fe1f9fa8a673029febf477c02fcafabf55de5f6f97d4187547661de88ab938d45c46a282505d6949f53b8522194f3709674b30cb8a0381fabec4ce7f358abe2e298ff7d01b534c0bc7f376447a3c8dda9df9b024d8d5fe51714a8a0b4f6855339e09ced393ffada4a82021753ec3f2acefcdb8c58ce5c13497272fc8a305f7857cf2a0added16c5a8e0a9fb6da648ddf45e78016d84ed82e3930c69f89c8bb1658fb4d10433165833b8233c607a38596c03276bfb320f144d2cd9b89c959d9ffc4184feb8d61ed8b8fdf45c2ad8c6fb9084c7c25f19aa479a4b2b6f461c87eb169daa2128cf40cc30fa9280a37130021ce7d645090bae2e463aaf321',
    code: 200,
  }
} else if (vip1) {
  chxm1023.result = {
    result: [
      {
        identity: '000-002-00001',
        privilegeStatus: 'activated',
        privilege: {
          status: 'cancel',
          payType: '4',
          expiresDate: 4092599349000,
          purchaseDate: 1666666666666,
        },
        canPay: true,
      },
    ],
    code: 200,
  }
}

$done({ body: JSON.stringify(chxm1023) })
