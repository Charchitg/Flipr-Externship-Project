const express = require('express');
const { Signup, Login } = require('../Controllers/Signup&Login');
const { GetUserDetails } = require('../Controllers/User');
const { ValidateJwt } = require('../Middlewares/VerifyJwt');

const router = express.Router();

router.post('/users/signup' , Signup );

router.post('/login' , Login);

router.get('/user/details' , ValidateJwt , GetUserDetails);


module.exports = router;