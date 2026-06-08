const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexion exitosa a la base de datos");
    connection.release();
  } catch (error) {
    console.log("Error al conectar a la base de datos");
  }
};
testConnection();

module.exports = {
  pool,
};
