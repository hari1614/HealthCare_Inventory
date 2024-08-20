const express = require("express");
const {
  getTablets,
  getTablet,
  createTablet,
  deleteTablet,
  updateTablet,
  updateTablets,
} = require("../controllers/proTablet");
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')

const routerTwo = express.Router();

//require auth for all routes
routerTwo.use(requireAuth)

//Get all products
routerTwo.get("/", getTablets);

//Get single product
routerTwo.get("/:id", getTablet);

//Post a new product
routerTwo.post("/", createTablet);

//admin auth 
routerTwo.use(requireAdmin)

// PUT (Update) product (replace entire resource)
routerTwo.put("/:id", updateTablets);

//Delete a product
routerTwo.delete("/:id", deleteTablet);

//update a product
routerTwo.patch("/:id", updateTablet);

module.exports = routerTwo;
