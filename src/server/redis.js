const {
    DB_USER,
    DB_PASSWORD,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
} = process.env;

const redis = require('redis');

const redisConfig = {
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    no_ready_check: true
}
const redisClient = redis.createClient(redisConfig);

redisClient.auth(REDIS_PASSWORD);
const { promisify } = require('util');
const getAsync = promisify(redisClient.get).bind(redisClient);


const chatPub = redis.createClient(redisConfig);
const chatSub = redis.createClient(redisConfig);

chatSub.subscribe('chat');
chatSub.subscribe('chat_read');

chatSub.on('message', (channel, data) => {
    if (channel === 'chat') handleChat(data);
    if (channel === 'chat_read') handleChatRead(data);
})

const handleChat = (data) => {
    const { message, chatId, sender } = JSON.parse(data);
    const sockets = global.socketIO.sockets.sockets;
    for (let socketId in sockets) {
        const socket = sockets[socketId];
        if (socket.tokenPayload.id === chatId) {
            // chatpartner is online
            // change chatId to sender so it arrives correctly
            console.log('about to emit', { chatId: sender.id, message })
            socket.emit('new_message', { chatId: sender.id, message })
        }
    }
}

const handleChatRead = (data) => {
    let chat = JSON.parse(data);
    // emit update chats event to both users involved in chat
    const sockets = global.socketIO.sockets.sockets;
    for (let socketId in sockets) {
        const socket = sockets[socketId];
        if (socket.tokenPayload.id === chat.initiator) {
            socket.emit('update_chat_reads', chat);
        } else if (socket.tokenPayload.id === chat.partner) {
            let x = chat.partner;
            chat.partner = chat.initiator;
            chat.initiator = x;
            socket.emit('update_chat_reads', chat);
        }
    }
}

module.exports = {
    redisClient,
    chatPub,
    chatSub,
    getAsync
}