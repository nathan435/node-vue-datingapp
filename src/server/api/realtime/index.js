module.exports = (server) => {
    const io = require('socket.io')(server);


    io.on('connection', (socket) => {
        console.log('someone connected');
    })

    setInterval(() => {
        io.emit('test')
    }, 500)
    

    return io;
}