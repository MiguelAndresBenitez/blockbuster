const express = require('express');
const rutas = express.Router();

const Usuario = require('../modelo/usuario.js');

const passport = require('passport')
const validar = require('validator');


//Registrar usuarios
rutas.post('/usuarios/registrar', async (req, res) => {
    try {
        const { nombre, email, contraseña, confirmarContraseña } = req.body;
    
        // Verificar si el usuario ya está registrado
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
          return res.status(400).json({ mensaje: 'El usuario ya está registrado' });
        }

        //Verificar si las contraseñas son iguales
        if (contraseña !== confirmarContraseña){
            return res.status(400).json({ mensaje: 'las contraseñas no coinsiden'});
        }

        // Validar la sefuridad de la contraseña
        const esContraseñaValida = validar.isStrongPassword(contraseña, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            returnScore: false,
        });
        if (!esContraseñaValida){
            return res.status(400).json({ mensaje: 'La contraseña es muy poco segura' });
        }

        // Crear el nuevo usuario
        const nuevoUsuario = new Usuario({
          nombre,
          email,
          contraseña,
        });

        // Encriptar la contraseña
        nuevoUsuario.contraseña = await encriptarContraseña(contraseña);

        // Guardar nuevo usuario
        await nuevoUsuario.save();
    
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
      } catch (err) {
        console.error('Error al registrar el usuario:', err);
        res.status(500).json({ mensaje: 'Error al registrar el usuario' });
      }
});


// Inicio de sesión
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: req.user });
});
/*
rutas.post('/usuarios/login', async (req, res) => {
    try {
        const { email, contraseña } = req.body;
    
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
          return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    
        // Verificar la contraseña
        const contraseñaValida = await matchContraseña(contraseña);
        if (!contraseñaValida) {
          return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }
    
        // Generar el token de acceso
        const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1h' });
    
        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
      } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
      }
});
*/

// Cierre de sesión
app.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
});

// Crear el superusuario
const crearSuperusuario = async () => {
    try {
      const superusuarioExistente = await Usuario.findOne({ email: 'root@root.com' });
      if (superusuarioExistente) {
        console.log('El superusuario ya existe');
        return;
      }
  
      const hashedContraseña = await bcrypt.hash('root', 10);
  
      const superusuario = new Usuario({
        nombre: 'root',
        email: 'root@root.com',
        contraseña: hashedContraseña,
      });
      await superusuario.save();
  
      console.log('Superusuario creado exitosamente');
    } catch (err) {
      console.error('Error al crear el superusuario:', err);
    }
};
  
crearSuperusuario();

module.exports = rutas;