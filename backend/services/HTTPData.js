const { pool } = require("../config/database");

const AddUserDB = async (
  name,
  lastname,
  email,
  password,
) => {
  try {
    const values = [name, lastname, email, password];
    const sql =
      "INSERT INTO user(user_name,user_lastname,user_email,password_hash) values (?,?,?,?)";
    const [rows] = await pool.execute(sql, values);
    return rows;
  } catch (error) {
    console.log(
      "No se Pudieron Registrar los datos 🫠 ",
      error.message,
    );
    return null;
  }
};

const FindUserEmail = async (email) => {
  try {
    const sql = "SELECT * FROM user WHERE user_email = ?";
    const [rows] = await pool.execute(sql, [email]);
    if (rows.length === 0) {
      throw new Error("No hay registros de ese Email");
    }
    return rows[0];
  } catch (error) {
    console.log("Error en la Query: ", error.message);
    return null;
  }
};

module.exports = {
  AddUserDB,
  FindUserEmail,
};
