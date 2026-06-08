const { pool } = require("../config/database");

const findEmail = async (email) => {
  try {
    const sql = "SELECT * FROM user where user_email = ?";

    const [rows] = await pool.execute(sql, [email]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.log(
      "Error en el servise database: ",
      error.message,
    );
  }
};

module.exports = {
  findEmail,
};
