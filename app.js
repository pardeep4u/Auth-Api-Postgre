const express = require("express");
const bodyParser = require("body-parser");
const { notFound } = require("./errorHandler/notFound");
const { authRouter } = require("./routes/authRoutes");
const { errorHanlding } = require("./errorHandler/errorHandler");
const { sequelize } = require("./db");

require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", authRouter);

app.use(notFound);
app.use(errorHanlding);

async function connect() {
  await sequelize.sync();
  console.log("Database synced");
  app.listen(process.env.PORT, () => {
    console.log(`Currently listening on port ${process.env.PORT}`);
  });
}

// Start the Express server
connect();
