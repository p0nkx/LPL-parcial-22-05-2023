console.log("Existos en el parcial :-)")


const express = require('express')

const demoRoute = require('./routes/demo.route')
const demoController = require('./controllers/demo.controller')
const vehiculosRoute = require('./routes/vehiculo.route')
const vehiculosController = require('./controllers/vehiculos.controller')

const PORT = process.env.PORT || 3010
const app = express()

app.use(express.json())

app.use("/demo", demoRoute)
app.use("/vehiculos",vehiculosRoute)

app.listen( PORT , ()=>{ console.log(`Arranco en el puerto ${PORT}`)} )
