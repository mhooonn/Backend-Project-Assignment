// controllers/convertController.js

const convertCurrency = async (req, res) => {
  try {
    const { amount, from, to } = req.body;

    // basic validation
    if (!amount || !from || !to) {
      return res.status(400).send("All fields are required");
    }

    if (isNaN(amount)) {
      return res.status(400).send("Amount must be a number");
    }

    // frankfurter API URL
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.rates || !data.rates[to]) {
      return res.status(500).send("Conversion failed");
    }

    const result = data.rates[to];

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