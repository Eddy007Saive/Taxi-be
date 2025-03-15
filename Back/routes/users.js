var express = require('express');
var router = express.Router();
const UerController=require('../controllers/UserController');
const UserController = require('../controllers/UserController');

/* GET users listing. */
router.post('/', UserController.login);
router.post('/register', UserController.register);


module.exports = router;
