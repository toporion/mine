const { signup, login } = require('../controller/AuthController');
const { signupValidation, loginValidation } = require('../middleware/UserValidation');

const route=require('express').Router()

route.post('/login',loginValidation,login)
route.post('/signup',signupValidation,signup)

module.exports=route;