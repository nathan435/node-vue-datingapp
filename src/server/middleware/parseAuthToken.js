const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

module.exports = async (req, res, next) => {
    try {
        const token = req.get('auth');
        const tokenPayload = await jwt.verify(token, SECRET);
    
        req.user = tokenPayload;
    } catch (e) {
        req.user = null;
    }
    next();
}