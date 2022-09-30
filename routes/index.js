const express = require('express');

// const apiRouter = require('./apiRoutes');dont need
const htmlRouter = require('./notes');

const app = express();

// app.use('/', apiRouter); dont need?
app.use('/notes', htmlRouter);


module.exports = app;