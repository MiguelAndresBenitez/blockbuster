const mongoose = require('mongoose');

const Reservas = new mongoose.Schema({
    _id_reserva: { type: Number },
    _id_usuario: { type: Number },
    _id_pelicula: { type: Number },
    fecha: { type: Date, required: true } 
});

module.exports = mongoose.model('Reserva', Reservas);
