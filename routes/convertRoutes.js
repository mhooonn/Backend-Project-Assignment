const express = require("express");
const router = express.Router();
const { convertCurrency } = require("../controllers/convertController");

const {saveConversion, getConversions, getConversion, deleteConversion} = require("../controllers/history")

router.post("/convert", convertCurrency);

router.post("/", saveConversion);
router.get("/", getConversions);
router.get("/:id", getConversion);
router.delete("/:id", deleteConversion);

module.exports = router;