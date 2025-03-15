var express = require('express');
var router = express.Router();
const multer=require('multer')
const upload=multer({
  
})

/* GET users listing. */
router.get('/',upload.single("image"), function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
