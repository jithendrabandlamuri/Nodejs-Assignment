const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//MongoDb Connection Config
mongoose
  .connect("mongodb://localhost:27017/user_au")
  .then((res) => {
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.log("Mongodb Connection Failed...", err);
  });

app.use(require("./router"));

app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));
