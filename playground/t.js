const moment = require('moment')

var time = moment()
console.log(time)
console.log(time.valueOf())

console.log(time.format('YYYY MMM Do HH:mm a'))