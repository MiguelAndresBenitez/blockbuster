const mongoose = require('mongoose');

const Peliculas = new mongoose.Schema({
    _id: { type: Number },
    titulo: {type: String, required: true},
    genero: {type: String, required: true},
    descripcion: {type: String, required: true} ,
    disponibilidad: {type: Boolean, default: true}
});

module.exports = mongoose.model('Pelicula', Peliculas);