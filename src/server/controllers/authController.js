const User = require('../database/models/User');
const jwt = require('jsonwebtoken');

const {
    createUser,
    getUserByID
} = require('./usersController');

const {
    SECRET
} = require('../config');


const tryLogin = async (data) => {
    try {
        const {
            email,
            password
        } = data;

        const user = await User.findOne({ email });
        if (!user) throw new Error();
        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error();
        const token = jwt.sign(user.toTokenRepresentation(), SECRET);
        return {
            token,
            user: user.toFrontendOwnerRepresentation()
        };

    } catch (e) {
        console.log(e);
        return e;
    }
}

const signup = async (data) => {
    const user = await createUser(data);
    return user;
}

const setRole = async (data) => {
    try {
        const {
            id,
            role
        } = data;

        const user = await getUserByID(id);
        user.role = role;
        await user.save();

        return user.toFrontendRepresentation();
        
    } catch (e) {
        return e;
    }
}


module.exports = {
    tryLogin,
    signup,
    setRole
}