// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const bodyParser = require('body-parser');
// const mssql = require('mssql');
// const bcrypt = require('bcrypt');
// const authRoutes = require('./routes/authRoutes.js');

// const app = express();

// // Configuración del middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({ secret: 'tu_secreto', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Configuración de rutas
// app.use('/', authRoutes);

// // Redirección a login
// app.get('/', (req, res) => {
//   res.redirect('/login.html');
// });

// // Configuración de Express para archivos estáticos
// app.use(express.static('public'));

// // Arrancar el servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor en ejecución en http://localhost:${PORT}`);
// });


/////////////////////////////////////////////////////////////////////////////////


const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const mssql = require('mssql');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/authRoutes.js');
const ejs = require('ejs');


const app = express();

// Configuración del middleware
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(session({ secret: 'tu_secreto', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
 app.use(passport.session());

// // Configurar el motor de vistas
app.engine('html', require('ejs').renderFile);
  app.set('views', path.join(__dirname, 'public'));
  app.set('view engine', 'html');

  app.get('/', function(req, res){
    res.render("/login");
  })

// // Configuración de rutas
 app.use('/', authRoutes);

// // Redirección a login
   app.get('/', (req, res) => {
     res.redirect('/login');
   });

// // Configuración de Express para archivos estáticos
 app.use(express.static(path.join(__dirname, 'public')));

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
