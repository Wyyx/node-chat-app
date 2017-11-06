const expect = require('expect')
const {
    generateMessage,
    generateLocationMessage

} = require('./message')


describe('genetateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Tom'
        let text = 'Hello, Wyy!'
        let message = generateMessage(from, text)

        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({
            from,
            text
        })
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'Tom'
        let latitude = 15
        let longitude = 19
        let url = 'https://www.google.com/maps?q=15,19'
        let message = generateLocationMessage(from, latitude, longitude)

        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({
            from,
            url
        })
    })
})