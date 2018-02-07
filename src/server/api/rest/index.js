const express = require('express');
const apiRouter = express();

const usersRouter = require('./users');
const authRouter = require('./auth');
const adminRouter = require('./admin');



apiRouter.use(usersRouter);
apiRouter.use(authRouter);
apiRouter.use('/admin', adminRouter);



module.exports = apiRouter;