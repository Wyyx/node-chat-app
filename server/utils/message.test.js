const expect = require('expect')
const {
    message
} = require('./message')


describe('genetateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Tom'
        let text = 'Hello, Wyy!'
        let createdAT = new Date().getTime()
        let message = {
            from,
            text,
            createdAT
        }

        expect(message.createdAT).toBeA('number')
        expect(message).toInclude({
            from,
            text
        })
    })
})