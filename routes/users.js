const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile',passport.checkAuthentication,usersController.profile); //ye checkAuthentication esliye likha hai kuki phle esa ho rha tha na ki agr users/profile likho to sidhe profile khul jata agr sign in na ho tbbhi so ye check lgaya hai taki tabi profile khukel jb logined ho 
//router.get('/profile',,usersController.profile); //ye checkAuthentication esliye likha hai kuki phle esa ho rha tha na ki agr users/profile likho to sidhe profile khul jata agr sign in na ho tbbhi so ye check lgaya hai taki tabi profile khukel jb logined ho 
 router.get('/sign-up',usersController.signup);
 router.get('/sign-in',usersController.signin);

router.post('/create',usersController.create);
//router.post('/createSession',usersController.createSession);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
), usersController.createSession);

 module.exports = router;