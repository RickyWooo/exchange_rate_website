const request = require('request')
const url = 'http://rate.megabank.com.tw/bulletin02_02.asp'
request(url, (err, res, body) => {
  console.log(body)
})