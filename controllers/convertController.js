// controllers/convertController.js
const Conversion = require("../models/Conversion");
const { validationResult } = require("express-validator");

const convertCurrency = async (req, res) => {
  try {
    const { amount, from, to } = req.body;

const errors = validationResult(req);

if (!errors.isEmpty()) {
  const response = await fetch("https://api.frankfurter.app/currencies");
  const currencies = await response.json();

  const currencyList = Object.entries(currencies).map(([code, name]) => ({
    code,
    name
  }));

  return res.render("index", {
    errors: errors.array(),
    currencyList,
    title: "Currency Converter"
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