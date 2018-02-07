const cloudinary = require('cloudinary');
const uuidv4 = require('uuid/v4');

cloudinary.config({ 
    cloud_name: 'dh54dr3k9', 
    api_key: '328617644829868', 
    api_secret: 'zdfCEhoDwd2VOJt8_RpuPtOSRuE' 
});

const baseUploadConfig = {
    width: 1000,
    height: 1000,
    crop: 'limit',
    format: 'png',
    folder: 'DatingApp'
}
  

const uploadImage = async (img, name) => {
    const uploadResult = await cloudinary.v2.uploader.upload(
        img,
        {
            public_id: name,
            width: 1000,
            height: 1000,
            crop: 'limit',
            format: 'png',
            folder: 'DatingApp'
        }
    );

    console.log(uploadResult);
}

const cloudinaryUploadProfileImage = async (img, userId) => {
    // upload img as <userid>_profile in DatingApp/profiles/<userid>/
    const uploadResult = await cloudinary.v2.uploader.upload(
        img,
        {
            ...baseUploadConfig,
            public_id: `${userId}_profile`,
            folder: `DatingApp/profiles/${userId}/`
        }
    )
}

const cloudinaryUploadGalleryImage = async (img, userId) => {
    // upload img as random id
    const uploadResult = await cloudinary.v2.uploader.upload(
        img,
        {
            ...baseUploadConfig,
            public_id: uuidv4(),
            folder: `DatingApp/profiles/${userId}/gallery/`
        }
    )

    return uploadResult;
}

const cloudinaryGetUserGalleryImages = async (userId) => {
    const fetchResult = await cloudinary.v2.api.resources({
        type: 'upload',
        prefix: `DatingApp/profiles/${userId}/gallery`
    })

    return fetchResult;
}

const cloudinaryGetUserProfileImagePath = (userId) => {
    return `https://res.cloudinary.com/dh54dr3k9/image/upload/v1517952820/DatingApp/profiles/${userId}/${userId}_profile`;
}

const cloudinaryDeleteImageById = (imageId) => {
    const deleteResult = await cloudinary.v2.api.uploader.destroy(imageId);
    return deleteResult;
}

module.exports = {
    cloudinaryUploadProfileImage,
    cloudinaryUploadGalleryImage,
    cloudinaryGetUserGalleryImages,
    cloudinaryGetUserProfileImagePath,
    cloudinaryDeleteImageById
}