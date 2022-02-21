const { register, login } = require('../services/userServices.js');
const mapErrors = require('../utils/mappers.js');
const { isUser, isGuest } = require('../middlewares/guards.js');
const router = require('express').Router();


router.get('/register', isGuest(), (req, res) => {
    
    res.render('register', { title: 'Register Page' });
});

router.post('/register', isGuest(), async (req, res) => {
   
    try {
        if(req.body.password == ''){
            throw new Error('Password is required!');
        }else if(req.body.password.length < 4){
            throw new Error('Password is less then 4 characters');
        }else if(req.body.password != req.body.rePass){
            throw new Error('Password\'s must be equals');
        };
        
        const user = await register(req.body.fname, req.body.lname, req.body.email, req.body.password);
        
        req.session.user = user;
        
        res.redirect('/');
        
    } catch (error) {
        
        const data = {
            fname    : req.body.fname,
            lname    : req.body.lname,
            email    : req.body.email,
            password : req.body.password,
        };
        
        const errors = mapErrors(error);

        res.render('register', {title: 'Register Page', ...data, errors});
    }
   
   

});

router.get('/login', isGuest(), (req, res) => {
    
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest(), async (req, res) => {
    
    try {
        const user = await login(req.body.email, req.body.password);

        req.session.user = user;

        res.redirect('/');

    } catch (error) {
        
        const errors = mapErrors(error);
        
        res.render('login', {title: 'Login Page', data: {email: req.body.email}, errors });
    }
});

router.get('/logout', (req, res) => {
    
    delete req.session.user;
    res.redirect('/');
});



module.exports = router;