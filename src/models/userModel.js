const sql = require('mssql');

const config = {
  user: 'sa',
  password: '1928',
  server: 'LENOVO-MIKI',
  database: 'PRUEBA1',
  options: {
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

// REGISTRO Y LOGIN
async function getUserByUsername(username) {
  const query = `SELECT * FROM datos WHERE Usuario = '${username}'`;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  const query = `SELECT * FROM datos WHERE id = '${id}'`;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

async function saveUser(username, password) {
  const query = `INSERT INTO datos (Usuario, Contraseña) VALUES ('${username}', '${password}')`;

  try {
    const pool = await sql.connect(config);
    await pool.request().query(query);
  } catch (error) {
    throw error;
  }
}

//RECETAS Y PUBLICACIONES

const saveReceta = async (userId, titulo, contenido) => {
  const query = `
    INSERT INTO Recetas (userId, titulo, contenido)
    VALUES (@userId, @titulo, @contenido);
  `;

  try {
      const pool = await sql.connect(config);
      await pool
          .request()
          .input('userId', userId)
          .input('titulo', titulo)
          .input('contenido', contenido)
          .query(query);
  } catch (error) {
      throw error;
  }
};

const getRecetasByUserId = async (userId) => {
  const query = `
    SELECT * FROM Recetas
    WHERE userId = @userId;
  `;

  try {
      const pool = await sql.connect(config);
      const result = await pool
          .request()
          .input('userId', userId)
          .query(query);

      return result.recordset;
  } catch (error) {
      throw error;
  }
};


module.exports = {
  getUserByUsername,
  getUserById,
  saveUser,
  saveReceta,
  getRecetasByUserId,
};
