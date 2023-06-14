const mongoose = require('mongoose');

const Usuarios = new mongoose.Schema({
    _id: { type: Number },
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    contraseña: {type: String, required: true}
});

module.exports = mongoose.model('Usuario', Usuarios);
