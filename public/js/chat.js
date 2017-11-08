var socket = io()

socket.on('connect', function () {
    console.log('Connected to server')

    var params = jQuery.deparam(window.location.search)

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err)
            window.location.href = '/'
        } else {
            console.log('No error')

        }
    })
})

socket.on('updateUserList', function (users) {
    console.log('Users List', users)

    var ol = jQuery('<ol></ol>')

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user))
    });

    jQuery('#users').html(ol)

})

socket.on('disconnet', function () {
    console.log('Disconnected from server')

})

socket.on('userGone', function (message) {
    console.log(message)

})


socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('HH:mm a')

    var template = jQuery('#message-template').html()
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    })

    jQuery('#message-list').append(html)
})

socket.on('newLocationMessage', function (locationMessage) {
    var formattedTime = moment(locationMessage.createdAt).format('HH:mm a')

    var template = jQuery('#location-template').html()

    var html = Mustache.render(template, {
        from: locationMessage.from,
        url: locationMessage.url,
        createdAt: formattedTime
    })

    jQuery('#message-list').append(html)


    // var li = jQuery('<li></li>')
    // var a = jQuery('<a target="blank">My Current Location</a>')

    // li.text(`${locationMessage.from} ${formattedTime}: `)
    // a.attr('href', locationMessage.url)
    // li.append(a)
    // jQuery('#message-list').append(li)
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault()
    var messageTextBox = jQuery('[name=message]')

    if (messageTextBox.val().trim()) {
        socket.emit('createMessage', {
            text: messageTextBox.val()
        }, function (acknow) {
            console.log(acknow)
            messageTextBox.val('')
        })
    }

})

var locationButton = jQuery('#location-button')
locationButton.on('click', function (location) {

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location')
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position)

        locationButton.removeAttr('disabled').text('Send Location')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })

    }, function () {
        console.log('Unable to fetch location')

    })

})