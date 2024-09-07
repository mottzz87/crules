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
