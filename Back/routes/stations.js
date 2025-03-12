var express = require('express');
var router = express.Router();
const StationController=require("../controllers/StationController")

/* GET users listing. */
router.post('/Station/create',StationController.create);
router.get('/Stations',StationController.all);


module.exports = router;
