const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require("../modelo/usuario");

// Configuración de la estrategia de autenticación local
passport.usuario(
    new LocalStrategy({ usernameField: 'email' }, 
    async (email, contraseña, done) => {
      const usuario = Usuario.findOne({ email: email });
  
      if (!usuario) {
        return done(null, false, { message: 'El usuario no está registrado' });
      }
  
      // Compara la contraseña ingresada con el hash almacenado
      if (!bcrypt.compareSync(contraseña, usuario.contraseña)) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
  
      return done(null, usuario);
    })
  );
  
  // Serialización del usuario
  passport.serializeUsuario((usuario, done) => {
    done(null, usuario.id);
  });
  
  // Deserialización del usuario
  passport.deserializeUsuario((id, done) => {
    const usuario = Usuario.findOne( id, (err, usuario) =>{
        done(null, usuario);
    });
  });