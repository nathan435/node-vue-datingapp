const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const { chatPub, chatSub } = require('../../redis');
const { SECRET } = require('../../config');

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('someone connected');

        socket.on('logout', (data) => {
            console.log('someone logged out')
            console.log(data);
            socket.disconnect();
        })

        socket.on('message', ({ message, chatId }) => {
            const msgObject = { message, chatId };
            msgObject.message.id = uuidv4();
            // attach the sender to change the chatId for the receiving user
            msgObject.sender = socket.tokenPayload;
            chatPub.publish('chat', JSON.stringify(msgObject))
        })
    })

    // io auth
    io.use(async (socket, next) => {
        try {
            const authToken = socket.handshake.query.authToken;
            const tokenPayload = await jwt.verify(authToken, SECRET);
            if (tokenPayload) {
                socket.tokenPayload = tokenPayload;
                return next();
            } 
        } catch(e) {
            next(new Error('Unauthorized'))
        }
    })

    return io;
}