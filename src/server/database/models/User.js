const { mongoose } = require('../index');
const bcrypt = require('bcrypt');
const { cloudinaryGetUserProfileImagePath } = require('../../api/services/cloudinary');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'regular'
    },
    dateOfBirth: {
        type: Date
    },
    deleted: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    visitors: [{
        user: {
            type: mongoose.Schema.ObjectId, ref: 'User'
        },
        lastVisit: Date,
        timesVisited: Number
    }],
    profile: {
        gender: String,
        gendersInterestedIn: Array,
        geolocation: Array,
        distanceInterestedIn: Number
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (!this.isModified('password') && !this.isNew) return next();
    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        return next();
    } catch (e) {
        return next(e);
    }
})

userSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
}

userSchema.methods.toTokenRepresentation = function() {
    return {
        id: this._id,
        email: this.email,
        role: this.role,
    }
}

userSchema.methods.toFrontendRepresentation = function() {
    return {
        id: this._id,
        email: this.email,
        username: this.username,
        role: this.role,
        profileImage: cloudinaryGetUserProfileImagePath(this._id)
    }
}

userSchema.methods.toFrontendDetailRepresentation = function() {
    return {
        id: this._id,
        email: this.email,
        username: this.username,
        role: this.role,
        profile: this.profile,
        profileImage: cloudinaryGetUserProfileImagePath(this._id)
    }
}

userSchema.methods.toFrontendOwnerRepresentation = function() {
    return {
        id: this._id,
        email: this.email,
        username: this.username,
        role: this.role,
        profile: this.profile,
        likes: this.likes,
        visitors: this.visitors,
        profileImage: cloudinaryGetUserProfileImagePath(this._id)
    }
}



module.exports = mongoose.model('User', userSchema);