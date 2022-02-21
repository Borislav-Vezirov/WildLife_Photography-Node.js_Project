const router = require('express').Router();
const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const postController = require('../controllers/postController.js');

router.use(homeController);
router.use(authController);
router.use(postController);

router.use('*', (req, res) => {
    
    res.render('404');
});


module.exports = router;