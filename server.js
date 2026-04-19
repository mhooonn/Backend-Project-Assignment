const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Servu toimii!");
});

app.listen(3000, () => {
  console.log("Servu käynnissä portissa 3000");
});