const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  updateProducts,
} = require("../controllers/productController");
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')


const router = express.Router();

//require auth for all routes
router.use(requireAuth)



//Get all products
router.get("/", getProducts);

//Get single product
router.get("/:id", getProduct);

//Post a new product
router.post("/", createProduct);

//admin auth 
router.use(requireAdmin)

// PUT (Update) product (replace entire resource)
router.put("/:id", updateProducts);

//Delete a product
router.delete("/:id", deleteProduct);

//Delete a product
router.patch("/:id", updateProduct);

module.exports = router;
