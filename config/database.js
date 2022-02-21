const mongoose = require('mongoose');
require('../models/User.js');


async function initDb(){

    try {
        
        await mongoose.connect('mongodb://localhost:27017/wildlife');
        console.log('Connected to database');
        
    } catch (error) {
        console.log('Can\'t connect to database');
    };
};

module.exports = initDb;