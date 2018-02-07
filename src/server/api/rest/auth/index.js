const express = require('express');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const authRouter = express();

const {
    createUser,
} = require('../../../controllers/usersController');

const {
    tryLogin,
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




module.exports = authRouter;