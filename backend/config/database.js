const mysql2 = require("mysql2/promise");

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "213400967Fm.",
  database: "gestion_de_inventario",
  timezone: "z",
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexion exitosa 👌 👌");
    connection.release();
  } catch (error) {
    console.log("Conexion fallida 😭 😓 ", error.message);
  }
};
testConnection();

module.exports = {
  pool,
};
