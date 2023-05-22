const express = require('express')
const route = express.Router()

const demoController = require('../controllers/demo.controller')
route.get("/", (req, res)=>{
    res.status(200).json({mensje:"hola mundo"})
})


module.exports = route