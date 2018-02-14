const axios = require('axios');
const { cloudinary } = require('../api/services/cloudinary');


function cloudinaryUpload(req, res, next) {

    // validate stuff ?

    console.log('file', req.file);

    cloudinary.uploader.upload_stream((result) => {
        req.result = result;
        next();
    }).end(req.file.buffer);
}

module.exports = cloudinaryUpload;
