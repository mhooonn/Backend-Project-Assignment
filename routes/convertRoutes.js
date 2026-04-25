const express = require("express");
const router = express.Router();
const { convertCurrency } = require("../controllers/convertController");

const {saveConversion} = require("../controllers/history")

router.post("/convert", convertCurrency);

router.post("/", saveConversion);

module.exports = router;