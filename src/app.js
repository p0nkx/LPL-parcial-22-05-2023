console.log("Existos en el parcial :-)")


const express = require('express')

const demoRoute = require('./routes/demo.route')
const demoController = require('./controllers/demo.controller')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use("/demo", demoRoute)

app.listen( PORT , ()=>{ console.log(`Arranco en el puerto ${PORT}`)} )
