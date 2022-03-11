const mongoose = require('mongoose');

const tokenCenterSchema = new mongoose.Schema({
    tokenName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    tokenRate: {
        type: Number,
        min: 0
    },
    usdRate: {
        type: Number,
        min: 0
    },
    dateWon: {
        type: Date
    },
    wonBy: {
        type: String,
    }
});

const TokenCenter = mongoose.model('TokenCenter', tokenCenterSchema);

exports.TokenCenter = TokenCenter;
