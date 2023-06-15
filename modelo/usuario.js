const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Usuarios = new mongoose.Schema({
    _id: { type: Number },
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    contraseña: {type: String, required: true}
});

Usuarios.methods.encriptarContraseña = async (contraseña) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contraseña, salt);
};
  
Usuarios.methods.matchContraseña = async function (contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('Usuario', Usuarios);
