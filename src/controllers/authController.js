// const userModel = require('../models/userModel.js');
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const passportConfig = require('../passportConfig.js');
// const LocalStrategy = require('passport-local').Strategy;  // Requiere el archivo de configuración

// exports.register = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const existingUser = await userModel.getUserByUsername(username);

//     if (existingUser) {
//       return res.status(400).json({ message: 'El usuario ya existe' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     userModel.saveUser(username, hashedPassword);

//     return res.status(201).json({ message: 'Usuario registrado exitosamente' });
//   } catch (error) {
//     console.error('Error en el registro:', error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };

// exports.login = passport.authenticate('local', {
//   failureRedirect: '/login-failure',
//   successRedirect: '/login-success'
// });

// exports.logout = (req, res) => {
//   req.logout();
//   res.redirect('/');
// };

// authController.js

//////////////////////////////////////////////////////////////////



const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// authController.js

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await userModel.getUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    userModel.saveUser(username, hashedPassword);

    // Redirige al usuario a la página de inicio de sesión con un indicador de éxito en la URL
    return res.redirect('/login?success=true');
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.login = passport.authenticate('local', {
  failureRedirect: '/login-failure',
  successRedirect: '/home',
});

 exports.home = (req, res) => {
     res.render('home', { user: req.user });
};

  exports.renderHome = (req, res) => {
    // Obtener el nombre de usuario (asumo que está disponible en req.user)
    const username = req.user ? req.user.Usuario : 'Invitado';  // Ajusta según tu lógica de obtención

  //Renderizar la página home con EJS y pasar datos
 res.render('home', { username });
  };

exports.logout = (req, res) => {
   req.logout();
   res.redirect('/');
 };

exports.subirReceta = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  const { titulo, contenido } = req.body;
  const userId = req.user.id;

  try {
    await userModel.saveReceta(userId, titulo, contenido);
    res.status(201).json({ message: 'Receta subida exitosamente' });
  } catch (error) {
    console.error('Error al subir receta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
exports.renderSubirReceta = (req, res) => {
  // Obtener el nombre de usuario (asumo que está disponible en req.user)
  const username = req.user ? req.user.Usuario : 'Invitado';

  // Renderizar la página subirRecetas con EJS y pasar datos
  res.render('subirRecetas', { username });
};



exports.verRecetas = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  const userId = req.user.id;

  try {
    const recetas = await userModel.getRecetasByUserId(userId);
    res.render('verRecetas', { recetas });
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


passport.use(new LocalStrategy(async (username, password, done) => {
   try {
     const user = await userModel.getUserByUsername(username);

     if (!user) {
       return done(null, false, { message: 'Usuario incorrecto' });
     }

     const passwordMatch = await bcrypt.compare(password, user.Contraseña);

     if (!passwordMatch) {
       return done(null, false, { message: 'Contraseña incorrecta' });
     }

     return done(null, user);
} catch (error) {
     return done(error);
   }
 }));


 passport.serializeUser((user, done) => {
   done(null, user.id);
 });

 passport.deserializeUser(async (id, done) => {
try {
     const user = await userModel.getUserById(id);
     return done(null, user);
   } catch (error) {
     return done(error);
   }
 });
