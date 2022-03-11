const jwt = require('jsonwebtoken');
const config = require('config');
const {TokenCenter} = require('../models/tokenCenter');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { tokenWon, dateWon } = req.body;
    const authToken = req.header('x-auth-token');
    if (!authToken) return res.status(401).send('Access denied, you are not logged in...');
    
    const tokenNames = ['Alpha', 'Beta', 'Delta']
    
    const random = Math.floor(Math.random() * 1000);
    const dollarConvert = 15/100;
    const usdValueOfToken = (dollarConvert * random).toFixed(2);
    console.log('USD-RATE++++', usdValueOfToken);
    const randomTokenName = Math.floor(Math.random() * tokenNames.length);
    
    try{
        const decoded = jwt.verify(authToken, config.get('jwtPrivateKey'));
        let newTokenRecord = new TokenCenter();
        newTokenRecord.tokenName = `${tokenNames[randomTokenName]}-${tokenWon}`;
        newTokenRecord.tokenRate = random;
        newTokenRecord.dateWon = dateWon;
        newTokenRecord.wonBy = decoded._id;
        newTokenRecord.usdRate = usdValueOfToken;
        
        
        await newTokenRecord.save();
        
    }catch(err){
        res.status(400).send('Invalid authentication token.');
    }
    
    if(!tokenWon && dateWon) return res.status(400).send('No token won...');
    
})

module.exports = router;