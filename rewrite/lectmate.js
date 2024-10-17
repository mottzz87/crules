/*

项目名称：有道留学听课宝-解锁Pro

[rewrite_local]
^https:\/\/intervip\.youdao\.com\/api\/verify\/ios-receipt url script-response-body LectMate.js

[mitm]
hostname = intervip.youdao.com

*/


var ojbk = JSON.parse($response.body);
ojbk = {
  "code" : 0,
  "data" : {
    "subscriptionStatus" : "ENABLED",
    "trial" : false,
    "expireDate" : 4102372800000,
    "environment" : "production",
    "product" : "classtranslate",
    "currentDate" : 1728866701971,
    "originalPurchaseDate" : 1728866699000,
    "autoRenewStatus" : "STATUS_ON",
    "localCode" : "CN",
    "priceActualUsd" : 0,
    "requestCountry" : "--",
    "introOfferStatus" : "STATUS_ON",
    "valid" : true,
    "quantity" : 1,
    "status" : "VERIFY_SUCCESS",
    "business" : "VIP",
    "createDate" : 1728866701971,
    "outTradeNo" : "",
    "statusCode" : 0,
    "purchaseDate" : 4102372800000,
    "productId" : "3_week_all_5.99_240115_6000_lp",
  },
  "status" : 0,
  "msg" : "success"
}
  
  
$done({ body: JSON.stringify(ojbk) });