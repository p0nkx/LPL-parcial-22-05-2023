const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');

// Ruta para obtener todas las reservas
router.get('/api/reservas', reservaController.getReservas);

// Ruta para obtener una reserva por su id
router.get('/api/reservas/:id', reservaController.getReservaById);

// Ruta para eliminar una reserva por su id
router.delete('/api/reservas/:id', reservaController.deleteReservaById);

// Ruta para crear una nueva reserva
router.post('/api/reserva', reservaController.createReserva);

// Ruta para buscar la última reserva realizada por un cliente específico
router.get('/api/reservas/search', reservaController.getUltimaReservaByCliente);


module.exports = router;
