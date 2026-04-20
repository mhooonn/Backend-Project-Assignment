const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

const uri = process.env.URI;

// promise
mongoose.connect(uri)
.then((result) => console.log("connected to db"))
.catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.send("Servu toimii!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected to ${PORT}`));