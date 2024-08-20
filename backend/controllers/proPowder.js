const PowderModel = require("../models/PowderModel"); // Assuming you have a 'PowderModel' defined
const mongoose = require("mongoose");

// Get all powders
const getPowders = async (req, res) => {
  const powders = await PowderModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(powders);
};
// Get a single powder by ID

const getPowder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const powder = await PowderModel.findById(id);

  if (!powder) {
    return res.status(404).json({ error: "No such a product" });
  }

  res.status(200).json(powder);
};

// Create a new powder
const createPowder = async (req, res) => {
  const { name, productNum, quantity, unitAndKg, stock, mrp, price, taxPercentage, date } =
    req.body;

  // add doc to db
  try {
    const powder = await PowderModel.create({
      name,
      productNum,
      quantity,
      unitAndKg,
      stock,
      mrp,
      price,
      taxPercentage,
      date,
    });

    res.status(200).json(powder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a powder by ID
const deletePowder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid powder ID" });
  }

  try {
    const powder = await PowderModel.findByIdAndDelete(id);
    if (!powder) {
      return res.status(404).json({ error: "Powder not found" });
    }
    res.status(200).json(powder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE ENTIRE PRODUCT
const updatePowders = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  try {
    const product = await PowderModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ error: "No such product" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePowder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const powder = await PowderModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!powder) {
    return res.status(404).json({ error: "No such a product" });
  }
  res.status(200).json(powder);
};

module.exports = {
  getPowders,
  getPowder,
  createPowder,
  deletePowder,
  updatePowder,
  updatePowders,
};
