const mongoose = require('mongoose');

const connectToDB = (DB_USER, DB_PASSWORD) => {
    mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds211088.mlab.com:11088/expressdating`);
}

mongoose.Promise = global.Promise;

module.exports = {
    connectToDB,
    mongoose
}