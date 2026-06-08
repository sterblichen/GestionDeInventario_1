const express = require("express");
const {
  validateJWT,
} = require("../middleware/validateJWT");
const {
  loginValidate,
} = require("../controllers/controller-login");
const routeAuth = express.Router();

routeAuth.post("/Login", loginValidate);

routeAuth.get("/home", validateJWT, (req, res) => {
  return res.json({
    msg: "acceso ",
  });
});

module.exports = {
  routeAuth,
};
