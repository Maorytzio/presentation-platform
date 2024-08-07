const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const presentationRoutes = require("./routes/presentationRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
