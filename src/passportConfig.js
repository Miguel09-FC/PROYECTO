const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('./models/userModel');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await userModel.getUserByUsername(username);

    if (!user) {
      return done(null, false, { message: 'Usuario incorrecto' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

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
