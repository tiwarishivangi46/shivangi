const express = require('express');

const router = express.Router();
const passport = require('passport');

 const commentsController = require('../controllers/comments_controller');
 router.post('/create',passport.checkAuthentication,commentsController.create);   //phle sirf ejs file m if dala ..ki agr insan login nhi ho to usko posts krne na mile ..but koi bhi inspect krke form bana lena ..so for that controller ie action level pr kita yha authenticate 

 router.post('/destroy/:id',passport.checkAuthentication,commentsController.destroy);
 module.exports = router;