const bcrypt = require("bcrypt");
const {
  AddUserDB,
  FindUserEmail,
} = require("../services/HTTPData");

const AddUserController = async (req, res) => {
  try {
    const { Name, Password, LastName, Email } = req.body;
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(
      Password,
      saltRound,
    );
    const dataDB = await AddUserDB(
      Name,
      LastName,
      Email,
      passwordHash,
    );
    if (!dataDB) {
      return res.status(500).json({
        ok: false,
        msg: "No se registraron los datos",
      });
    }
    return res.status(200).json({
      ok: true,
      data: dataDB,
    });
  } catch (error) {
    console.log(
      "problema en el controller ",
      error.message,
    );
  }
};

const LoginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const EmailVerify = await FindUserEmail(Email);

    if (!EmailVerify) {
      throw new Error("No hay registro de este Email");
    }

    const passwordVerify = await bcrypt.compare(
      Password,
      EmailVerify.password_hash,
    );
    if (!passwordVerify) {
      throw new Error("Password Incorrecta");
    }

    return res.status(200).json({
      ok: true,
      data: EmailVerify,
      msg: "Se Inicio Sesion",
    });
  } catch (error) {}
};

module.exports = {
  AddUserController,
  LoginUser,
};
