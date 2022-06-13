require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cookieParser = require("cookie-parser");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const PORT = process.env.PORT || 7000;
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/", router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
