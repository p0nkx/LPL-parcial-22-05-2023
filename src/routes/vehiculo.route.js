const express = require('express');
const router = express.Router();


const vehiculosController = require('../controllers/vehiculos.controller');

router.get("/api/vehiculos",vehiculosController.getAllvehiculos)
router.get('/api/vehiculos/:patente', vehiculosController.getVehiculoByPatente);
router.post('/api/vehiculos', vehiculosController.createVehiculo);
router.put('/api/vehiculos/:patente', vehiculosController.updateVehiculo);

module.exports = {router}
