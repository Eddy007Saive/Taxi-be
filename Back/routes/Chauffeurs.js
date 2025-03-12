const express = require('express');
const router = express.Router();
const ChauffeurController = require('../controllers/ChauffeurController')

router.post('/Chauffeur/create',ChauffeurController.create);
router.get('/Chauffeurs',ChauffeurController.all);

module.exports = router;
