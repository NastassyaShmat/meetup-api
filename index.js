require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json");
const cookieParser = require("cookie-parser");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const PORT = process.env.PORT || 7000;
const app = express();

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Meetup API",
//       version: "1.0.0",
//       description:
//         "This is a CRUD REST Web API application made with Express for work with meetups.",
//     },
//   },
//   apis: ["./routes/*.js"],
// };
//const swaggerSpec = swaggerJsDoc(options);
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/", router);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
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
