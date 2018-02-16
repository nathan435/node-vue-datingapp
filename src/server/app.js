const express = require('express');

const applyMiddleware = require('./middleware')
const app = applyMiddleware(express());



const apiRouter = require('./api/rest');
app.use('/api', apiRouter);

module.exports = app;