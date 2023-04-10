const { Router } = require ('express');
const authController = require ('../controllers/authController')
const router = Router();


router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/create', authController.blog_create_get);
router.post('/', authController.blog_create_post);
router.get('/', authController.logout_get);
router.get('/data', authController.blog_index);
router.get('/:id', authController.blog_details);
router.delete('/:id', authController.blog_delete);
router.put('/:id', authController.blog_update)


module.exports = router;