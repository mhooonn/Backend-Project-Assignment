const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// 🔹 import routes
const convertRoutes = require("./routes/convertRoutes");
const Conversion = require("./models/Conversion");

// 🔹 middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 view engine (ONLY if using Handlebars)
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// 🔹 MongoDB connection
const uri = process.env.URI;

mongoose.connect(uri)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// 🔹 home route
app.get("/", (req, res) => {
  res.render("index"); // instead of res.send
});

// 🔹 routes
app.get("/history", async (req, res) => {
    const conversions = await Conversion.find().sort({ _id: -1 }).lean();
    res.render("history", {conversions});
});

app.use("/api/conversions", convertRoutes);

// 🔹 server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));