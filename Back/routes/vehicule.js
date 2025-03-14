const express = require('express');
const router = express.Router();
const VehiculeController = require('../controllers/VehiculeController')

router.post('/Vehicule/create',VehiculeController.create)
router.get('/Vehicules', VehiculeController.all)
module.exports = router;
