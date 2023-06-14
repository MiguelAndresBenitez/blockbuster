const express = require('express');
const rutas = express.Router();

//Ruta inicial
rutas.get('/', (req, res) => {
    res.render('../vista/index.html')
});

module.exports = rutas;