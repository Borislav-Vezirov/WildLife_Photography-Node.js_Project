const { isUser } = require('../middlewares/guards.js');
const { createPost, getOneById, getOneAndUpdate, deletePost, vote } = require('../services/postServices.js');
const mapErrors = require('../utils/mappers.js');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});


router.post('/create', isUser(), async (req, res) => {
    
    const userId = req.session.user._id;
    
    const post = {
        title       : req.body.title,
        keyword     : req.body.keyword,
        location    : req.body.location,
        date        : req.body.date,
        image       : req.body.image,
        description : req.body.description,
        author      : userId
    };

    try {
        
        await createPost(post);

        res.redirect('/catalog');

    } catch (error) {
        
        const errors = mapErrors(error);
        res.render('create', { title: 'Create Page', errors , data: post});

    }
});

router.get('/catalog/details/:id/edit', isUser(), async (req, res) => {
    
    const id = req.params.id;

    const post = await getOneById(id);

    if(req.session.user._id != post.author._id){

        return res.redirect('/login');
    };
 

    res.render('edit', { title: 'Edit Page', ...post })
});

router.post('/catalog/details/:id/edit', isUser(), async (req, res) => {
    
    const id = req.params.id;

    const existing = await getOneById(id);

    if(req.session.user._id != existing.author._id){

        return res.redirect('/login');
    };

    try {
        const post = await getOneAndUpdate(id, req.body);
        res.redirect('/catalog/details/' + id);
        
    } catch (error) {
        const errors = mapErrors(error);
        res.render('edit', { title: 'Edit Page', errors});
        
    }
});

router.get('/:id/delete', isUser(), async (req, res) => {

    const id = req.params.id;

    const existing = await getOneById(id);

    if(req.session.user._id != existing.author._id){

        return res.redirect('/login');
    };
   
    try {
        
        await deletePost(id);

        res.redirect('/catalog');

    } catch (error) {
        const errors = mapErrors(error);
        res.render('details', { errors });
    }
});

router.get('/vote/:id/:type', isUser(), async (req, res) => {
    
    const id    = req.params.id;
    const value = req.params.type == 'upvote' ? 1 : -1;

    try {
        
        await vote(id, req.session.user._id, value);

        res.redirect('/catalog/details/' + id);

    } catch (error) {

        const errors = mapErrors(error);
        res.render('details', { errors });

    };
});

module.exports = router; 