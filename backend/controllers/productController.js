const Product = require("../models/Products");
const mongoose = require("mongoose");

//get all product
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
};

//get asingle product

const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such a product" });
  }

  res.status(200).json(product);
};

//create a product

const createProduct = async (req, res) => {
  const { name, productNum, quantity, unitAndKg, stock, mrp, price, taxPercentage, date } =
    req.body;

  // add doc to db
  try {
    const product = await Product.create({
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

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a product

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const product = await Product.findByIdAndDelete({ _id: id });

  if (!product) {
    return res.status(404).json({ error: "No such a product" });
  }
  res.status(200).json(product);
};

// UPDATE ENTIRE PRODUCT
const updateProducts = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, updateData, {
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
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const product = await Product.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(404).json({ error: "No such a product" });
  }
  res.status(200).json(product);
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  updateProducts,
};
