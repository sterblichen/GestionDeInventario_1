require("dotenv").config();
const { routeAuth } = require("./routes/route-auth");
const cors = require("cors");
const express = require("express");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", routeAuth);

app.listen(process.env.SV_PORT, () => {
  console.log(
    `Servidor levantado en el puerto: http://localhost:${[process.env.SV_PORT]}`,
  );
});
