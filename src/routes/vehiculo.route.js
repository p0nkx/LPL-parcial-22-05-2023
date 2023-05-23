const express = require('express');
const router = express.Router();


const vehiculosController = require('../controllers/vehiculos.controller');

// Ruta para obtener todos los vehiculos
router.get("/api/vehiculos",vehiculosController.getAllvehiculos)

//Ruta para obtener un vehiculo por patente
router.get('/api/vehiculos/:patente', vehiculosController.getVehiculoByPatente);

//Ruta para crear un vehiculo
router.post('/api/vehiculos', vehiculosController.createVehiculo);

//Ruta para modificar un vehiculo
router.put('/api/vehiculos/:patente', vehiculosController.updateVehiculo);

module.exports = router;
