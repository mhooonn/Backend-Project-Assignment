const Conversion = require ('/models/conversion');

// save conversion to db
const saveConversion = async (req, res) => {
  try {
    const {from, to, amount, result} = req.body;

    const conversion = await Conversion.create({from, to, amount, result});

    res.status(201).json(conversion);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    saveConversion
};
