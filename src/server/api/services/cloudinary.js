const cloudinary = require('cloudinary');
const uuidv4 = require('uuid/v4');

const {
    CLOUDINARY_BASE_URL,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env;

cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET 
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

    return uploadResult;
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
    return uploadResult;
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
    return `${CLOUDINARY_BASE_URL}/profiles/${userId}/${userId}_profile`;
}

const cloudinaryDeleteImageById = async (imageId) => {
    const deleteResult = await cloudinary.v2.api.uploader.destroy(imageId);
    return deleteResult;
}

module.exports = {
    cloudinaryUploadProfileImage,
    cloudinaryUploadGalleryImage,
    cloudinaryGetUserGalleryImages,
    cloudinaryGetUserProfileImagePath,
    cloudinaryDeleteImageById,
    cloudinary
}