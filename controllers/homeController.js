const { isUser } = require('../middlewares/guards.js');
const { getAllPost, getOneById, getPostsByAuthor } = require('../services/postServices.js');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});


router.get('/catalog', async (req, res) => {

    const posts =  await getAllPost();

    res.render('catalog', { title: 'Catalog Page' , posts});
});

router.get('/catalog/details/:id', async (req, res) => {

    const id = req.params.id;

    const post = await getOneById(id);

    if(req.session.user){

        post.hasUser = true;

        if(req.session.user._id == post.author._id){

            post.isAuthor = true;
        }else{

            post.isVoted = post.votes.find(x => x._id == req.session.user._id) != undefined;

        };
    };

    console.log(post);

    res.render('details', { title: 'Details Page', ...post });
});


router.get('/profile', isUser(), async (req, res) => {
    
    
    const posts =  await getPostsByAuthor(req.session.user._id);

    res.render('profile', { title: 'Profile Page' , posts});
});



module.exports = router; 