const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// 🔹 import routes
const convertRoutes = require("./routes/convertRoutes");

// 🔹 middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 MongoDB connection
const uri = process.env.URI;

mongoose.connect(uri)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// 🔹 view engine (ONLY if using Handlebars)
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// 🔹 routes
app.use("/", convertRoutes);

// 🔹 home route
app.get("/", (req, res) => {
  res.render("index"); // instead of res.send
});

// 🔹 server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));