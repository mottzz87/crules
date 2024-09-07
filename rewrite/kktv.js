let originBody = JSON.parse($response.body)

console.log('originBody--------', originBody)

let response = {
  data: {
    is_allowed: true,
  },
}
console.log('modifiedBody---------', response)

$done({ body: JSON.stringify(response) })
