const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

const { chatPub, chatSub } = require('../../redis');
const { SECRET } = require('../../config');

const chatController = require('../../controllers/chatController');

const initChatForUser = async (socket) => {
    const userId = socket.tokenPayload.id;
    const chats = await chatController.findAllChatsForUser(userId);
    socket.emit('init_chats', chats);
}

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('someone connected');

        // on connection emit a init_chats and send out the current chats data for the socket user
        initChatForUser(socket);


        socket.on('logout', (data) => {
            console.log('someone logged out')
            console.log(data);
            socket.disconnect();
        })

        socket.on('message', ({ message, chatId }) => {
            const msgObject = { message, chatId };
            msgObject.message.id = uuidv4();
            msgObject.message.timestamp = moment().format();
            // attach the sender to change the chatId for the receiving user
            msgObject.sender = socket.tokenPayload;
            chatPub.publish('chat', JSON.stringify(msgObject))
            // long term store in mongodb
            chatController.newChatMessage(socket.tokenPayload.id, chatId, msgObject.message);
        })

        socket.on('chat_read', async ({ chatId }) => {
            // update all msgs in chat as read in mongodb chat document
            //
            const userId = socket.tokenPayload.id;
            const { isUpdate, chat } = await chatController.userReadChat(userId, chatId);
            console.log('isupdate', isUpdate);
            if (isUpdate) chatPub.publish('chat_read', JSON.stringify(chat));
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