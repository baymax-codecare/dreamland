const winston = require('winston');
const bcrypt = require('bcrypt');
const {User, authValidate} = require('../models/users');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { error } = authValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    try{
        let user = await User.findOne({email: req.body.email });
        if(!user) return res.status(400).send('Invalid email or password...');
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Invalid email or password...');
        const token = user.generateAuthKey();
        res.header('x-auth-token', token).send(token);
    }catch(err){
        for(fields in err.errors){
            console.log('Error', err.errors[fields])
        }
    }
})

module.exports = router;