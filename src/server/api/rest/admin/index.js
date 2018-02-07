const express = require('express');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const isAdmin = require('../../../middleware/isAdmin');

const adminRouter = express();
adminRouter.use(isAdmin);

const {
    getAllUsers,
    getUserByID,
    getUserByEmail,
    createUser,
    updateUser,
    softDeleteUser,
    userLikeUser,
    hardDeleteUser,
    updateUserProfile,
    frontendGetAllUsers,
    frontendGetUserWithProfile,
    frontendGetUserSelf,
    handleProfileVisit
} = require('../../../controllers/usersController');

const {
    setRole
} = require('../../../controllers/authController');


// Get all users
adminRouter.get('/users', [
],
async (req, res) => {
    const users = await getAllUsers();
    return res.json({
        users
    })
})

// Soft Delete user
adminRouter.delete('/users', [
    check('id').exists()
    .custom(async (id) => {
        const userExists = await getUserByID(id);
        if (!userExists) throw new Error('user does not exist');
        return true;
    })
],
async (req, res) => {
    try {
        validationResult(req).throw();
        const data = matchedData(req);

        const deleted = await softDeleteUser({ userID: data.id });
        
        return res.json({
            deleted
        });
    } catch (e) {
        return res.json({ errors: e.mapped() });
    }
})

module.exports = adminRouter;