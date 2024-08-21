require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;
const presentationRoutes = require("./routes/presentationRoutes");

connectDB();

app.use(logger);

app.use(cors());

app.use(express.json());

app.use("/presentations", presentationRoutes);

if (process.env.NODE_ENV === "development") {
  const swaggerConfig = require("./docs/swaggerConfig");
  swaggerConfig(app);
}

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
