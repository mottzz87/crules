[rewrite_local]
^https:\/\/api\.kktv\.me\/v3\/ipcheck url script-response-body https://raw.githubusercontent.com/mottzz87/crules/main/rewrite/kktv.js

[mitm]
hostname = api.kktv.me

let originBody = JSON.parse($response.body)

console.log('originBody--------', originBody)

let response = {
    status: 200,
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        data: {
            is_allowed: true
        }
    })
};
console.log('modifiedBody---------', response)
$done(response);
