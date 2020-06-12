var events = require('events');
var eventEmitter = new events.EventEmitter();


const timer = () => {
    return new Promise((resolve, reject) => {
        const ij = setTimeout(() => {
            resolve(1)
        }, 7000)

        eventEmitter.on('resolve', () => {
            clearTimeout(ij)
            resolve(2)
        })
    })
}

timer().then(data => console.log(data))
eventEmitter.emit('resolve1')
