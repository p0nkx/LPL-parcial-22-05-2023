console.log("Existos en el parcial :-)")


const express = require('express')

const demoRoute = require('./routes/demo.route')
const demoController = require('./controllers/demo.controller')

//Me traigo todo lo exportado en controller y route de vehiculos
const vehiculosRoute = require('./routes/vehiculo.route')
const vehiculosController = require('./controllers/vehiculos.controller')

//Me traigo todo lo exportado en controller y route de reservas
const reservasRoute = require('./routes/reservas.route')
const reservasController = require('./controllers/reservas.controller')

//Decimos que escuche en la constante PORT o un valor pasado 
const PORT = process.env.PORT || 3010
const app = express()

app.use(express.json())

app.use("/demo", demoRoute)
app.use("/vehiculos",vehiculosRoute)
app.use("/reservas", reservasRoute)

app.listen( PORT , ()=>{ console.log(`Arranco en el puerto ${PORT}`)} )
