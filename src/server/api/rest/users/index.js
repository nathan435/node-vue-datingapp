const express = require('express');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const passport = require('../../../middleware/passport');
const isAdmin = require('../../../middleware/isAdmin');
const isAuthenticatedUser = require('../../../middleware/isAuthenticatedUser');
const configData = require('../../../config/data');

const usersRouter = express();

const {
    getAllUsers,
    getUserByID,
    getUserByEmail,
    createUser,
    updateUser,
    userLikeUser,
    softDeleteUser,
    updateUserProfile,
    frontendGetAllUsers,
    frontendGetUserWithProfile,
    frontendGetUserSelf,
    handleProfileVisit
} = require('../../../controllers/usersController');


// GET all users
usersRouter.get('/users', [
    isAuthenticatedUser
],
async (req, res) => {
    const users = await frontendGetAllUsers();
    return res.json({
        users
    })
})

// GET a user by id / visit a users profile
usersRouter.get('/users/:id', [
    isAuthenticatedUser,
    check('id').exists()
    ],
async (req, res) => {
    try {
        validationResult(req).throw();
        const data = matchedData(req);
    
        const user = await frontendGetUserWithProfile(data.id);
        res.json({
            user
        })

        // handle profile visit after client got response
        const visitorID = req.user.id;
        const visitedID = user.id;
        if (visitorID !== visitedID) {
            await handleProfileVisit({
                visitorID: req.user.id,
                visitedID: user.id
            })
        }
        return;
    } catch (e) {
        return res.json({ errors: e.mapped() });
    }

})

// Create a new user
usersRouter.post('/users', [
    passport.authenticate('jwt', { session: false}),
    check('username').exists(),
    check('password').isLength({ min: 5 }),
    check('email').isEmail().trim().normalizeEmail()
    .custom(async (value) => {
        const userExists = await getUserByEmail(value);
        if (userExists) throw new Error('email exists');
        return true;
    })
],
async (req, res) => {
    try {
        validationResult(req).throw();
        const data = matchedData(req);

        const user = await createUser(data);
        return res.json({
            user
        });
    } catch (e) {
        return res.json({ errors: e.mapped() });
    }

})



// Set role


// Get own user details with profile
usersRouter.get('/me', [
    isAuthenticatedUser
], async (req, res) => {
    try {
    const user = await getUserByID(req.user.id);
    const likedBy = [];
    const userData = {
        ...user.toFrontendOwnerRepresentation(),
        likedBy
    }
    return res.json({
        user: userData
    })

    } catch (e) {
        console.log(e);
        return res.json({})
    }
})

// Update own profile
usersRouter.patch('/me/profile', [
    isAuthenticatedUser,
    check('age'),
    check('username'),
    check('location'),
    check('description'),
    check('gender').isIn(configData.genders),
    check('geolocation'),
    check('gendersInterestedIn.*').isIn(configData.genders),
    check('distanceInterestedIn')
], async (req, res) => {
    try {
        validationResult(req).throw();
        const data = matchedData(req);

        const updatedUser = await updateUserProfile(
            {
                id: req.user.id,
                input: data
            }
        )

        console.log('updated user', updatedUser);

        return res.json({
            user: updatedUser.toFrontendDetailRepresentation()
        })

    } catch (e) {
        if (e.mapped) return res.json({ errors: e.mapped() });
        console.log(e);
        return res.json({});
    }
})


// User like or unlike a user
usersRouter.post('/users/like', [
    isAuthenticatedUser,
    check('likedID').exists()
],
async (req, res) => {
    try {
        validationResult(req).throw();
        const data = matchedData(req);

        const { user, match, liked } = await userLikeUser({
            userID: req.user.id,
            likedID: data.likedID
        })

        return res.json({
            user,
            match,
            liked
        });
    } catch (e) {
        if (e.mapped) return res.json({ errors: e.mapped() });
        console.log(e);
        return res.json({});
    }

})


module.exports = usersRouter;