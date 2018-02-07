const User = require('../database/models/User');


const createUser = async (data) => {
    // create the user in database
    const user = await User.create({
        ...data
    })
    return user;
    // return the user instance
    
}

const updateUser = async (data) => {

}

const hardDeleteUser = async (data) => {
    const {
        userID
    } = data;
    try {
        const deleted = await User.deleteOne(userID);

        return deleted;
    } catch (e) {
        return null;
    }
}

const softDeleteUser = async (data) => {
    const {
        userID
    } = data;
    try {
        const updatedUser = await User.findByIdAndUpdate(userID, {
            deleted: true
        })

        console.log(updatedUser);

        return updatedUser;
    } catch (e) {
        return null;
    }
}

const getUserByID = async (data) => {
    try {
        const user = await User.findById(data);
        return user;
    } catch (e) {
        return null;
    }
}

const frontendGetUserWithProfile = async (data) => {
    try {
        const user = await User.findById(data);
        return user.toFrontendDetailRepresentation();
    } catch (e) {
        return null;
    }
}

const frontendGetUserSelf = async (data) => {
    try {
        const user = await User.findById(data);
        return user.toFrontendOwnerRepresentation();
    } catch (e) {
        return null;
    }
}

const getUserByEmail = async (data) => {
    try {
        const user = await User.findOne({ email: data});
        return user;
    } catch (e) {
        return null;
    }
}

const getAllUsers = async (data) => {
    try {
        const users = await User.find({});
        return users;
    } catch(e) {
        console.log(e);
        return null;
    }
}

const frontendGetAllUsers = async (data) => {
    try {
        const users = await User.find({});
        return users.map(user => user.toFrontendRepresentation());
    } catch(e) {
        console.log(e);
        return null;
    }
}

const updateUserProfile = async (data) => {
    const id = data.id;
    const input = data.input;

    try {
        const user = await getUserByID(id);
        if (!user) throw new Error('not found');
        // input.gender && (user.profile.gender = input.gender);

        console.log('input', input);
        if (input.username) user.username = input.username;
        if (input.age) user.age = input.age;
        if (input.location) user.location = input.location;
        if (input.gender) user.profile.gender = input.gender;
        if (input.gendersInterestedIn) user.profile.gendersInterestedIn = input.gendersInterestedIn;
        if (input.geolocation) user.profile.geolocation = input.geolocation;
        if (input.distanceInterestedIn) user.profile.distanceInterestedIn = input.distanceInterestedIn;

        console.log('user', user);
        const savedUser = await user.save();

        return savedUser;

    } catch (e) {
        return e;
    }
}

const userLikeUser = async (data) => {
    const {
        userID,
        likedID
    } = data;

    try {
        const users = await Promise.all([
            getUserByID(userID),
            getUserByID(likedID),
        ])
        const user = users[0];
        const likedUser = users[1];
        let liked = false;
        
        if (user.likes.indexOf(likedID) !== -1) {
            user.likes.splice(user.likes.indexOf(likedID), 1);
        } else {
           user.likes.push(likedID);
           liked = true;
        }
        
        const savedUser = await user.save();

        return {
            user: savedUser.toFrontendOwnerRepresentation(),
            match: false,
            liked
        }

    } catch (e) {
        console.log(e);
        return e;
    }
}

const handleProfileVisit = async (data) => {
    const {
        visitorID,
        visitedID
    } = data;

    try {
        const now = new Date();
        const visitedUser = await getUserByID(visitedID);

        let revisitor = visitedUser.visitors.find(visitor => visitor.user == visitorID);
        if (revisitor) {
            const index = visitedUser.visitors.indexOf(revisitor);

            revisitor.lastVisit = now;
            revisitor.timesVisited = revisitor.timesVisited + 1;

            visitedUser.visitors.set(index, revisitor);
        } else {
            // first time visit
            visitedUser.visitors.push({
                user: visitorID,
                lastVisit: now,
                timesVisited: 1
            })
        }

        await visitedUser.save();
        return;
    } catch (e) {
        console.log(e);
        return e;
    }
}

const uploadProfilePicture = async (data) => {
    const {
        image
    } = data;

    
}



module.exports = {
    getAllUsers,
    getUserByID,
    getUserByEmail,
    createUser,
    updateUser,
    updateUserProfile,
    softDeleteUser,
    userLikeUser,
    hardDeleteUser,
    handleProfileVisit,
    frontendGetAllUsers,
    frontendGetUserWithProfile,
    frontendGetUserSelf
}