const jwt = require('jsonwebtoken');
const config = require('config');
const {TokenCenter} = require('../models/tokenCenter');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const authToken = req.header('x-auth-token');
    if(!authToken) return res.status(401).send('Access denied, you are not logged in...');
    try{
        const decoded = jwt.verify(authToken, config.get('jwtPrivateKey'));
        const id = decoded._id;
        const now = new Date();
        const getAllTokenForToday = await TokenCenter.find({wonBy: `${id}`, dateWon: { $gte: `${now}`}});
        
        if(getAllTokenForToday.length > 0){
            return res.status(200).send(getAllTokenForToday);
        }else{
            return res.status(200).send('No record found....');
        }
    }catch(err){
        for(fields in err.errors){
            console.log('Error', err.errors[fields])
        }
    }
})

module.exports = router;