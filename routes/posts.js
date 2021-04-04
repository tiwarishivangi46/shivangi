const express = require('express');

const router = express.Router();
const passport = require('passport');

 const postsController = require('../controllers/posts_controller');
 router.post('/create',passport.checkAuthentication,postsController.create);   //phle sirf ejs file m if dala ..ki agr insan login nhi ho to usko posts krne na mile ..but koi bhi inspect krke form bana lena ..so for that controller ie action level pr kita yha authenticate 
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy); //check2 - route level - delete the things only if person is logged in 


 module.exports = router;