const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const { body } = require("express-validator");
const { convertCurrency } = require("./controllers/convertController");

// 🔹 import routes
const convertRoutes = require("./routes/convertRoutes");
const Conversion = require("./models/Conversion");

// 🔹 middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static files
app.use(express.static('public'));

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
app.get("/", async (req, res) => {
    const response = await fetch("https://api.frankfurter.app/currencies");
    const currencies = await response.json();

    const currencyList = Object.entries(currencies).map(([code, name]) => ({code, name}));

    res.render("index", {currencyList});
});

// 🔹 routes
app.get("/history", async (req, res) => {
    const conversions = await Conversion.find().sort({ _id: -1 }).lean();
    res.render("history", {conversions});
});

// delete one from history
app.post("/history/:id/delete", async (req, res) => {
    await Conversion.findByIdAndDelete(req.params.id);
    res.redirect("/history");
});

app.use("/api/conversions", convertRoutes);



// 🔹 server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));