require('dotenv').config();

const {
    DB_USER,
    DB_PASSWORD
} = process.env;

const {
    PORT
} = require('./config');



const app = require('./app');

const { connectToDB } = require('./database');
connectToDB(DB_USER, DB_PASSWORD);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});