const User = require('../models/User.js');
const { hash, compare } = require('bcrypt');

async function register( fname, lname, email, password ){

    const existing = await getUserByEmail(email);

    if(existing){
        throw new Error('Email is taken');
    };

    const hashedPassword = await hash(password, 10);

    const user = new User({
        fname,
        lname,
        email,
        password: hashedPassword
    });

    await user.save();

    return user;
};

async function login(email, password){

    const user = await getUserByEmail(email);

    if(!user){
        throw new Error('Email or password are invalid')
    };

    const hasMatch = await compare(password, user.password);

    if(!hasMatch){
        throw new Error('Incorrect password')
    };

    return user;
};

async function getUserByEmail(email){

    return await User.findOne({ email: new RegExp(`^${email}$`, 'i')});
};

module.exports = {
    register,
    login
}