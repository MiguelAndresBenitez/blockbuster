require('./db')

const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de Passport
app.use(passport.initialize());
app.use(passport.session());
  
// Rutas
app.get('/', (req, res) => {
    res.send('¡El servidor está en funcionamiento!');
  });

//Inicio de servidor

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});