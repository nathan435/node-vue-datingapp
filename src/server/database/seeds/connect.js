require('dotenv').config({path: process.cwd() + '/.env'});
const { connectToDB } = require('../../database');
const {
    DB_USER,
    DB_PASSWORD
} = process.env;

console.log(DB_USER, DB_PASSWORD);


module.exports = () => {
    connectToDB(DB_USER, DB_PASSWORD);
}
