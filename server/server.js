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
const {
    Users
} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const users = new Users()





io.on('connection', (socket) => {
    console.log('New user connected')

    socket.on('join', (params, callback) => {

        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.')
        }

        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)


        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('admin', 'Welcom to chat room!'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined.`))
        callback()
    })

    socket.on('createMessage', (message, callback) => {

        let user = users.getUser(socket.id)

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }

        callback('Got it! (from server)')
    })

    socket.on('createLocationMessage', (coords) => {

        let user = users.getUser(socket.id)

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left.`))
        }
    })
})




app.use(express.static(path.join(__dirname, '/../public')));
const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Started on port ${port}`)
})