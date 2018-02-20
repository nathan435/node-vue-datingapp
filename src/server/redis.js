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


chatSub.on('message', (channel, msg) => {
    const { message, chatId, sender } = JSON.parse(msg);
    const sockets = global.socketIO.sockets.sockets;
    for (let socketId in sockets) {
        const socket = sockets[socketId];
        if (socket.tokenPayload.id === chatId) {
            // chatpartner is online
            // change chatId to sender so it arrives correctly
            socket.emit('new_message', { chatId: sender.id, message })
        }
    }
    //global.socketIO.emit('new_message', { chatId, message });
    //console.log(global.socketIO.sockets.sockets);
})

module.exports = {
    redisClient,
    chatPub,
    chatSub,
    getAsync
}