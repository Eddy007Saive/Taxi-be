var express = require('express');
var router = express.Router();
const TrajetController=require("../controllers/TrajetController")

/* GET users listing. */
router.post('/Trajet/create',TrajetController.create);
router.get('/Trajets',TrajetController.all);


module.exports = router;
