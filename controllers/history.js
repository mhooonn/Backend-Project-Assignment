const Conversion = require ('../models/conversion');

// save conversion to db
const saveConversion = async (req, res) => {
  try {
    const {from, to, amount, result} = req.body;

    const conversion = await Conversion.create({from, to, amount, result});

    res.status(201).json(conversion);

  } catch (err) {
        console.log(err)
    }
};

// get all 
const getConversions = async (req, res) => {
  try {
    const conversions = await Conversion.find();

    res.json(conversions);

  } catch (err) {
        console.log(err)
    }
};

module.exports = {
    saveConversion,
    getConversions
};
