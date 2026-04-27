// controllers/convertController.js
const Conversion = require("../models/Conversion");
const { validationResult } = require("express-validator");

const convertCurrency = async (req, res) => {
  try {
    const { amount, from, to } = req.body;

    const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.render("index", {
    errors: errors.array(),
    amount,
    from,
    to
  });
}

    

    // frankfurter API URL
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.rates || !data.rates[to]) {
      return res.status(500).send("Conversion failed");
    }

    const result = data.rates[to];

    await Conversion.create({
      from,
      to,
      amount,
      result
    });

    // if using Handlebars (SSR)
    res.render("index", {
      result,
      amount,
      from,
      to
    });

    // OR if API response (JSON), use this instead:
    // res.json({ result });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  convertCurrency
};