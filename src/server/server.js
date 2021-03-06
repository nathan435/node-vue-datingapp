require('dotenv').config();

const {
    DB_USER,
    DB_PASSWORD
} = process.env;

const {
    PORT
} = require('./config');


const app = require('./app');




const { redisClient } = require('./redis');


const { SECRET } = require('./config');

const server = require('http').createServer(app);
const io = require('./api/realtime')(server);
global.socketIO = io;

const { connectToDB } = require('./database');
connectToDB(DB_USER, DB_PASSWORD);


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});