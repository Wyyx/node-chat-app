require('./config/config')
const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })

    socket.emit('newMessage', {
        from: 'admin',
        text: 'Welcom to chat room!'
    })

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (email) => {
        console.log(email)

        // socket.broadcast.emit('newMessage', {
        //     from: 'Wyyx',
        //     text: 'Hello You',
        //     createdAt: new Date().getTime()
        // })
    })

})

app.use(express.static(path.join(__dirname, '/../public')));
const port = process.env.PORT || 3000


server.listen(port, () => {
    console.log(`Started on port ${port}`)
})