require('./config/config')
const path = require('path')
const express = require('express')

const app = express()
app.use(express.static(path.join(__dirname, '/../public')));
console.log(path.join(__dirname, '/../public'))

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Started on port ${port}`)
})