const express = require('express');

const users = require('../routes/users');
const auth = require('../routes/auth');
const haveWon = require('../routes/haveWon');
const userToken = require('../routes/userToken');
const usdAmountHistory = require('../routes/usdAmountHistory');
const transcationStatsDisplay = require('../routes/transactionStatsDisplay');

//const error = require('../middleware/error');



module.exports = function (app){
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/win', haveWon);
    app.use('/api/user-token-history', userToken);
    app.use('/api/usd-history', usdAmountHistory);
    app.use('/api/statistics', transcationStatsDisplay);
    
    //app.use(error);
}