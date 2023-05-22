console.log("Existos en el parcial :-)")


const express = require('express')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())

app.listen( PORT , ()=>{ console.log(`Arranco en el puerto ${PORT}`)} )
