const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

// middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

// Routes
const notesRoutes = require("./routes/notes");

const api = process.env.API_URL;

app.use(`${api}/notes`, notesRoutes);

// Database
mongoose
  .connect(process.env.CONNECTION_STRING, { dbName: "notes" })
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

// Development
// app.listen(3000, () => {
//   console.log("Server Running... \nhttp://localhost:3000");
// });

// Production
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Working on port" + port);
});
