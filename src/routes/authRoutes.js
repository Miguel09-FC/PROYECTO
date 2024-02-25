// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController.js');

// // Ruta para el registro
// router.post('/register', authController.register, (req, res) => {
//     // Después de registrar con éxito, redirige a /login con el mensaje de éxito en la URL
//     res.redirect('/login?success=true');
//   });

// // Ruta para el inicio de sesión
// router.post('/login', authController.login);

// // Rutas de éxito y fracaso
// router.get('/login-success', (req, res) => res.send('¡Inicio de sesión exitoso!'));
// router.get('/login-failure', (req, res) => res.send('Inicio de sesión fallido. Verifica tus credenciales.'));
// //Recetas
// router.post('/subir-receta', authController.subirReceta);
// router.get('/ver-recetas', authController.verRecetas);

// //Ruta  para web inicial
// router.get('/home', authController.home);

// router.get('/home', authController.renderHome);

// // Ruta para salir
// router.get('/logout', authController.logout);

// module.exports = router;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController.js');

// // Ruta para el registro
// router.post('/register', authController.register, (req, res) => {
//     // Después de registrar con éxito, redirige a /login con el mensaje de éxito en la URL
//      res.redirect('/login?success=true');
//     // res.redirect('/login.html?success=true');
// });

// // Ruta para mostrar la página de inicio de sesión
// router.get('/', (req, res) => {
//     res.render('login'); // No necesitas la ruta relativa si la vista está en la carpeta "public"
//   });

// // Ruta para el inicio de sesión
// router.post('/login', authController.login);

// // Rutas de éxito y fracaso
// router.get('/login-success', (req, res) => res.send('¡Inicio de sesión exitoso!'));
// router.get('/login-failure', (req, res) => res.send('Inicio de sesión fallido. Verifica tus credenciales.'));

// // Rutas para las recetas
// router.post('/subir-receta', authController.subirReceta);
// router.get('/ver-recetas', authController.verRecetas);


// // Rutas para la web inicial
// router.get('/home', authController.renderHome);

// // Ruta para salir
// router.get('/login', authController.logout);

// module.exports = router;


const express = require('express');
const path = require('path');
const router = express.Router();
const authController = require('../controllers/authController.js');

// Ruta para el registro
router.post('/register', authController.register, (req, res) => {
    // Después de registrar con éxito, redirige a /login con el mensaje de éxito en la URL
    res.redirect('/login?success=true');
});

// Ruta para mostrar la página de inicio de sesión
router.get('/', (req, res) => {
    res.render('login'); // No necesitas la ruta relativa si la vista está en la carpeta "public"
});

// Ruta para el inicio de sesión
router.post('/login', authController.login);

// Rutas de éxito y fracaso
router.get('/login-success', (req, res) => res.send('¡Inicio de sesión exitoso!'));
router.get('/login-failure', (req, res) => res.send('Inicio de sesión fallido. Verifica tus credenciales.'));

// Rutas para las recetas
router.post('/subirReceta', authController.subirReceta);
router.get('/ver-recetas', authController.verRecetas);
router.get('/subir-receta', authController.renderSubirReceta);

router.get('/subir-receta', (req, res) => {
  console.log('Llegó a /subir-receta');
  res.send('Llegó a /subir-receta');
});
// Rutas para la web inicial
router.get('/home', authController.renderHome);

// Ruta para salir
router.get('/logout', authController.logout);

module.exports = router;
