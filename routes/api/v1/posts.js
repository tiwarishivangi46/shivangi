const express = require('express');
const passport = require('passport');

const router = express.Router();
const postsApi = require("../../../controllers/api/v1/posts_api");
router.get('/',postsApi.index);
router.delete('/:id',passport.authenticate('jwt',{session: false}),postsApi.destroy);// ..so jo passport.jwt kra hai idr posts pr autheticate krna hai posts tabhi delte honge jb aap user honge ..also cookies nhi lana hai so faslse kr rakha hai usko



module.exports = router;