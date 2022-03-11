const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try{
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already exists....');
        
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        
    }catch(err){
        for (fields in err.errors) {
            console.log(err.errors[fields]);
        }
    }
})

module.exports = router;