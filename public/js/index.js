var socket = io()

socket.on('connect', function () {
    console.log('Connected to server')

    socket.emit('createEmail', {
        to: 'amy@example.com',
        text: 'Hello, Wyyx'
    })
})

socket.on('disconnet', function () {
    console.log('Disconnected from server')

})

socket.on('newEmail', function (email) {
    console.log(email)

})