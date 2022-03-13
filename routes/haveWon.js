const jwt = require('jsonwebtoken');
const config = require('config');
const moment = require('moment');
const {TokenCenter} = require('../models/tokenCenter');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { tokenWon, dateWon } = req.body;
    const authToken = req.header('x-auth-token');
    if (!authToken) return res.status(401).send('Access denied, you are not logged in...');
    if(!tokenWon && !dateWon) return res.status(400).send('No token won...');
    
    const tokenNames = ['Alpha', 'Beta', 'Delta'];
    let now = new Date();
    let month = now.getUTCMonth() + 1; //months from 1-12
    let day = now.getUTCDate();
    let year = now.getUTCFullYear();

    const newDate = year + "-" + month + "-" + day;
    const dateIsToday = newDate == dateWon;
    
    const random = Math.floor(Math.random() * 1000);
    const dollarConvert = 15/100;
    const usdValueOfToken = (dollarConvert * random).toFixed(2);
    const randomTokenName = Math.floor(Math.random() * tokenNames.length);
    
    try{
        const decoded = jwt.verify(authToken, config.get('jwtPrivateKey'));
        if(dateIsToday){
            const getUserTokenCount = await TokenCenter.find({ wonBy: decoded?._id });
            if(getUserTokenCount.length < 5){
                let formatDateWon = moment(dateWon);
                let newTokenRecord = new TokenCenter();
                newTokenRecord.tokenName = `${tokenNames[randomTokenName]}-${tokenWon}`;
                newTokenRecord.tokenRate = random;
                newTokenRecord.dateWon = formatDateWon.format();
                newTokenRecord.wonBy = decoded?._id;
                newTokenRecord.usdRate = usdValueOfToken;
                
                await newTokenRecord.save();
                res.status(200).send('record successfully saved...')
            }else{
                res.status(400).send(`you have reached todays's win limit, see you tomorrow!`);
            }
        }else{
            res.status(400).send(`Cannot win in the past...`);
        }
        
    }catch(err){
        res.status(400).send('Invalid authentication token.');
    }
    
})

module.exports = router;