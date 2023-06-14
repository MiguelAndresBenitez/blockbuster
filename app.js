require('./db')

const express = require('express');
const app = express();

const Reserva = require('./modelo/reserva.js');
  
// Rutas
app.get('/', (req, res) => {
    res.send('¡El servidor está en funcionamiento!');
  });

//Inicio de servidor

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});