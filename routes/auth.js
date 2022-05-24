/* 
    Rutas de usuarios /auth 
    host + /api/auth
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs');
const {createUser,loginUser, revalidateToken} = require('../controllers/auth');

const router = Router();

router.post('/new', 
    [//middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is incorrect or empty').isEmail(),
        check('password', 'Password must be 6 or more characters ').isLength({min: 6}),
        validateInputs
    ], 
    createUser );

router.post('/', 
    [
        check('email', 'Email is incorrect or empty').isEmail(),
        check('password', 'Password must be 6 or more characters ').isLength({min: 6}),
        validateInputs
    ],
    loginUser);
    
router.get('/renew', revalidateToken );

module.exports = router;