const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', usersController.update);

router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);


router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);

//for google authentication 
router.get('/auth/google',passport.authenticate('google' , { scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google', {faliureRedirect:'/users/sign-in'}),usersController.createSession);
//phla rout to vo hai jb google ko bolte ki jo mail hai vo authenticate kr 
//fir uske bad jb vo authenticate krke deta hai vps codeial ko vo callback rout
module.exports = router;
