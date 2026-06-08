const {
  findEmail,
} = require("../services/service-database");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginValidate = async (req, res) => {
  try {
    const { user_email, password_hash } = req.body;

    const userData = await findEmail(user_email);
    if (!userData) {
      return res.status(400).json({
        ok: false,
        msg: "Coloque sus datos correctamente",
      });
    }

    const verifyPassword = await bcrypt.compare(
      password_hash,
      userData.password_hash,
    );
    if (!verifyPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Coloque sus datos correctamente",
      });
    }

    const payload = {
      id: userData.id,
      email: userData.user_email,
    };

    const token = await jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "30s",
      },
    );

    return res.status(200).json({
      ok: true,
      token: token,
      msg: "Inicio de Sesion",
    });
  } catch (error) {
    console.log("Error en el controller-Login: ", error);
  }
};

module.exports = {
  loginValidate,
};
