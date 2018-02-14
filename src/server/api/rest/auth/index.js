const express = require('express');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const authRouter = express();

const {
    createUser,
    getUserByEmail
} = require('../../../controllers/usersController');

const {
    tryLogin,
    signup
} = require('../../../controllers/authController');



// Login (generate token)
authRouter.post('/login', [
    check('password').exists(),
    check('email').exists()
],
async (req, res) => {
    try {
        validationResult(req).throw();
        const data = matchedData(req);

        console.log(data);

        const { token, user } = await tryLogin(data);
        return res.json({
            token,
            user
        })
    } catch (e) {
        return res.json({ errors: e.mapped() })
    }

})


authRouter.post('/signup', [
    check('username').exists(),
    check('email').exists()
    .custom(async (value) => {
        const userExists = await getUserByEmail(value);
        if (userExists) throw new Error('email exists');
        return true;
    }),
    check('password').exists(),
    check('dateOfBirth').exists(),
    check('gender').exists(),
    check('geolocation').exists(),
],
async (req, res) => {
    try {
        validationResult(req).throw();
        const data = matchedData(req);

        const { token, user } = await signup(data);
        return res.json({
            token,
            user
        })
    } catch (e) {
        return res.json({ errors: e.mapped() })
    }
})




module.exports = authRouter;