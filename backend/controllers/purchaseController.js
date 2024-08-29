const PurchaseModel = require("../models/PurchaseModel");
const mongoose = require("mongoose");

// Get all purchases 
const getPurchases = async (req, res) => {
  try {
    const purchases = await PurchaseModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single purchase by ID
const getPurchase = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such purchase" });
  }

  try {
    const purchase = await PurchaseModel.findById(id);
    if (!purchase) {
      return res.status(404).json({ error: "No such purchase" });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new purchase
const createPurchase = async (req, res) => {
  const { productName, hsnCode, category, quantity } = req.body;

  try {
    const purchase = await PurchaseModel.create({
      productName,
      hsnCode,
      category,
      quantity,
    });
    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a purchase by ID
const deletePurchase = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid purchase ID" });
  }

  try {
    const purchase = await PurchaseModel.findByIdAndDelete(id);
    if (!purchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update entire purchase
const updatePurchases = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such purchase" });
  }

  try {
    const purchase = await PurchaseModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!purchase) {
      return res.status(404).json({ error: "No such purchase" });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a product
const updatePurchase = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such pourchases" });
    }
  
    const Purchase = await Purchase.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
  
    if (!Purchase) {
      return res.status(404).json({ error: "No such a product" });
    }
    res.status(200).json(Purchase);
  };

module.exports = {
  getPurchases,
  getPurchase,
  createPurchase,
  deletePurchase,
  updatePurchases,
  updatePurchase,
};

