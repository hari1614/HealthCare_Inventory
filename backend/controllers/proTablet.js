const TabletModel = require("../models/TabletModel");
const mongoose = require("mongoose");

//get all product
const getTablets = async (req, res) => {
  const tablets = await TabletModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(tablets);
};

//get asingle product

const getTablet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const tablet = await TabletModel.findById(id);

  if (!tablet) {
    return res.status(404).json({ error: "No such a product" });
  }

  res.status(200).json(tablet);
};

//create a product

const createTablet = async (req, res) => {
  const { name, productNum, quantity, unitAndKg, stock, mrp, price, taxPercentage, date } =
    req.body;

  // add doc to db
  try {
    const tablet = await TabletModel.create({
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
    res.status(200).json(tablet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a product

const deleteTablet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const tablet = await TabletModel.findByIdAndDelete({ _id: id });

  if (!tablet) {
    return res.status(404).json({ error: "No such a product" });
  }
  res.status(200).json(tablet);
};

// UPDATE ENTIRE PRODUCT
const updateTablets = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  try {
    const product = await TabletModel.findByIdAndUpdate(id, updateData, {
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

//update a product
const updateTablet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const tablet = await TabletModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!tablet) {
    return res.status(404).json({ error: "No such a product" });
  }
  res.status(200).json(tablet);
};

module.exports = {
  getTablets,
  getTablet,
  createTablet,
  deleteTablet,
  updateTablet,
  updateTablets,
};
