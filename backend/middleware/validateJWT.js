require("dotenv").config();
const jwt = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      msg: "No tiene Token la peticion",
    });
  }
  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    next();
  } catch (error) {
    console.log(
      "Error en el middlewareValidateJWT: ",
      error.message,
    );
    return res.status(401).json({
      ok: false,
      msg: "Token expirado",
    });
  }
};

module.exports = {
  validateJWT,
};
