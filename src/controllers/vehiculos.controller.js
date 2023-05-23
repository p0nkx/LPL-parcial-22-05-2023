const vehiculos = require('../../data/vehiculos.json')


const getAllvehiculos = (req,res)=>{
    res.json(vehiculos).status(200)
}


const getVehiculoByPatente = (req, res) => {
    const patente = req.params.patente
    //comparar la patente pasada por parametro y ver si existe
    const resultado = vehiculos.find( vehiculo => vehiculo.patente == patente)
    if(resultado) {
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El vehiculo con patente ${patente} no fue encontrado`} )
    }
}

const createVehiculo = (req, res) => {
    const vehiculoData = req.body;
  
    // Validar el formato de la patente
    const patenteRegex = /^[A-Z]{2}\d{3}[A-Z]{2}$/;
    if (!patenteRegex.test(vehiculoData.patente)) {
      res.status(400).json({ mensaje: 'La patente debe tener el formato XX999XX' });
      return;
    }
  
    // Validar que el vehículo no esté registrado previamente por la patente
    const existe = vehiculos.find(vehiculo => vehiculo.patente === vehiculoData.patente);
    if (existe) {
      res.status(400).json({ mensaje: `El vehículo con patente ${vehiculoData.patente} ya está registrado` });
      return;
    }
  
    // Validar la capacidad de personas a transportar
    if (typeof vehiculoData.capacidad !== 'number' || vehiculoData.capacidad < 1 || vehiculoData.capacidad > 10) {
      res.status(400).json({ mensaje: 'La capacidad de personas a transportar debe ser un número entre 1 y 10' });
      return;
    }
  
    // Validar la autonomía en kilómetros
    if (typeof vehiculoData.autonomiaKms !== 'number' || vehiculoData.autonomiaKms <= 0) {
      res.status(400).json({ mensaje: 'La autonomía en kilómetros debe ser un número mayor a 0' });
      return;
    }
  
    // Configurar el estado inicial del vehículo
    vehiculoData.habilitado = false;
  
    // Agregar el vehículo a la lista
    vehiculos.push(vehiculoData);
  
    res.status(201).json({ mensaje: `El vehículo con patente ${vehiculoData.patente} fue registrado correctamente` });
  };

  const updateVehiculo = (req, res) => {
    const patente = req.params.patente; // Obtener la patente del parámetro de la URL
    const { habilitado, capacidad, autonomiaKms } = req.body; // Obtener los atributos del cuerpo de la solicitud
  
    // Buscar el vehículo por patente
    const vehiculo = vehiculos.find(vehiculo => vehiculo.patente === patente);
  
    // Verificar si el vehículo existe
    if (!vehiculo) {
      res.status(404).json({ mensaje: `No se encontró un vehículo con la patente ${patente}` });
      return;
    }
  
    // Actualizar los atributos si se proporcionan en el cuerpo de la solicitud
    if (habilitado !== undefined) {
      vehiculo.habilitado = habilitado;
    }
    if (capacidad !== undefined) {
      vehiculo.capacidad = capacidad;
    }
    if (autonomiaKms !== undefined) {
      vehiculo.autonomiaKms = autonomiaKms;
    }
  
    res.status(200).json({ mensaje: `El vehículo con patente ${patente} fue actualizado correctamente` });
  };
  
  



module.exports = { 
    getAllvehiculos, 
    getVehiculoByPatente,
    createVehiculo,
    updateVehiculo,
}