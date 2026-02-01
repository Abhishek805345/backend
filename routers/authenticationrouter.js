const express=require('express');
const authenctaion=express();

//local module
const userauthenticaion=require('../controller/userauthenticationcontroller');


authenctaion.post('/post/register',userauthenticaion.register);
authenctaion.post('/post/login',userauthenticaion.logincheck);
authenctaion.post('/send/otp',userauthenticaion.sendotp);
authenctaion.post('/verify/otp/:id',userauthenticaion.verifyotp);
authenctaion.post('/reset/password/:id',userauthenticaion.resetpas);

module.exports=authenctaion;