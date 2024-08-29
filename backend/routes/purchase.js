const express = require("express");
const {
  createPurchase,
  getPurchases,
  getPurchase,
  deletePurchase,
  updatePurchase,
  updatePurchases,
} = require("../controllers/purchaseController"); // Updated import
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// Require auth for all routes
router.use(requireAuth);

// Get all purchases
router.get("/", getPurchases);

// Get a single purchase
router.get("/:id", getPurchase);

// Post a new purchase
router.post("/", createPurchase);

// Admin auth 
router.use(requireAdmin);

// PUT (Update) purchase (replace entire resource)
router.put("/:id", updatePurchases);

// Delete a purchase
router.delete("/:id", deletePurchase);

// PATCH (Update partial) purchase
router.patch("/:id", updatePurchase);

module.exports = router;
