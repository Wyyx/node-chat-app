require('./config/config')
const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message')
const {
    isRealString
} = require('./utils/validation')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)





io.on('connection', (socket) => {
    console.log('New user connected')

    socket.on('disconnect', () => {
        console.log('User was disconnected')
        socket.broadcast.emit('userGone', generateMessage('admin', 'A user gone'))
    })

    socket.emit('newMessage', generateMessage('admin', 'Welcom to chat room!'))
    socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'))

    socket.on('join', (params, callback) => {

        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.')
        }

        callback()
    })

    socket.on('createMessage', (message, callback) => {
        console.log(message)
        io.emit('newMessage', message)
        callback('Got it! (from server)')
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude))
    })
})




app.use(express.static(path.join(__dirname, '/../public')));
const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Started on port ${port}`)
})