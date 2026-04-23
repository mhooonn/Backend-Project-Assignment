const express = require("express");
const router = express.Router();
const { convertCurrency } = require("../controllers/convertController");

router.post("/convert", convertCurrency);

module.exports = router;