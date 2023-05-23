const reservas = require('../../data/reservas.json');
const vehiculos = require('../../data/vehiculos.json');

const getReservas = (req, res) => {
  res.json(reservas).status(200);
};

const getReservaById = (req, res) => {
  const id = req.params.id;
  const reserva = reservas.find((reserva) => reserva.id === id);

  if (reserva) {
    res.json(reserva).status(200);
  } else {
    res.status(404).json({ mensaje: `No se encontró una reserva con el id ${id}` });
  }
};

const deleteReservaById = (req, res) => {
  const id = req.params.id;
  const indice = reservas.findIndex((reserva) => reserva.id === id);

  if (indice === -1) {
    res.status(404).json({ mensaje: `La reserva con el id ${id} no fue encontrada` });
  } else {
    const reserva = reservas[indice];
    reservas.splice(indice, 1);
    res.status(200).json({ mensaje: `La reserva con el id ${id} fue eliminada correctamente`, reserva });
  }
};

const createReserva = (req, res) => {
  const reservaData = req.body;

  // Validar que la cantidad de personas sea un número entre 1 y 10
  if (typeof reservaData.personas !== 'number' || reservaData.personas < 1 || reservaData.personas > 10) {
    res.status(400).json({ mensaje: 'La cantidad de personas debe ser un número entre 1 y 10' });
    return;
  }

  // Validar que la distancia no supere los 500 kms
  if (typeof reservaData.distancia !== 'number' || reservaData.distancia > 500) {
    res.status(400).json({ mensaje: 'La distancia máxima permitida es de 500 kms' });
    return;
  }

  // Validar el formato de la fecha (AAAADDMM)
  const fechaRegex = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;
  if (!fechaRegex.test(reservaData.fecha)) {
    res.status(400).json({ mensaje: 'La fecha debe tener el formato AAAADDMM' });
    return;
  }

  // Obtener el vehículo que cumple las condiciones de la reserva
  const vehiculo = vehiculos.find(
    (vehiculo) => vehiculo.habilitado && vehiculo.capacidad >= reservaData.personas && vehiculo.autonomiaKms >= reservaData.distancia
  );

  if (!vehiculo) {
    res.status(404).json({ mensaje: 'No hay vehículos disponibles que cumplan las condiciones de la reserva' });
    return;
  }

  // Calcular el próximo id de reserva
  const id = (reservas.length + 1);

  // Crear la reserva
  const nuevaReserva = { id, ...reservaData, vehiculo };

  reservas.push(nuevaReserva);

  res.status(201).json({ mensaje: 'La reserva fue creada correctamente', reserva: nuevaReserva });
};

const getUltimaReservaByCliente = (req, res) => {
  const cliente = req.query.cliente;
  
  //filtramos las reservas por id, el metodo sort ordena estas reservas en orden descendente
  //luego utilizamos el metodo shift para agarrar el primer elemento del nuevo array generado
  //en cuyo caso sera el id mas alto de reserva por lo que seria la ultima reserva realizada

  const ultimaReserva = reservas.filter(reserva => reserva.cliente === cliente)
  .sort((a, b) => b.id - a.id).shift();

  if (ultimaReserva) {
    res.status(200).json(ultimaReserva);
  } else {
    res.status(404).json({ mensaje: 'No encontrado' });
  }
};

module.exports = {
  getReservas,
  getReservaById,
  deleteReservaById,
  createReserva,
  getUltimaReservaByCliente
};


