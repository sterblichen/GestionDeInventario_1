const {
  AddUserController,
  LoginUser,
} = require("./controllers/Controller");
const cors = require("cors");
const express = require("express");
const app = express();

const port = 3000;
app.use(express.json());
app.use(cors());

app.post("/api/v1/Login/RegisterUser", AddUserController);

app.post("/api/v1/Login", LoginUser);

app.listen(port, () => {
  console.log(
    `Servidor levantado en: http://localhost:${port} 👾 🤖`,
  );
});
