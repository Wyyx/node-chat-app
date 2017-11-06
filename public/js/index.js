var socket = io()

socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('disconnet', function () {
    console.log('Disconnected from server')

})

socket.on('userGone', function (message) {
    console.log(message)

})


socket.on('newMessage', function (message) {

    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`)

    jQuery('#message-list').append(li)

    console.log(message)
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault()

    socket.emit('createMessage', {
        from: 'Wyyx',
        text: $('[name=message').val()
    }, function (acknow) {
        console.log(acknow)
    })
})