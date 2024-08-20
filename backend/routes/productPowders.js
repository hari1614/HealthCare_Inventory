const express = require("express");
const {
  getPowders,
  getPowder,
  createPowder,
  deletePowder,
  updatePowder,
  updatePowders,
} = require("../controllers/proPowder"); // Assuming you have a 'proPowder' controller file
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')
const requireSubAdmin = require('../middleware/subAdmin')


const routerThree = express.Router();

//require auth for all routes
routerThree.use(requireAuth)

// Get all powders
routerThree.get("/", getPowders);

// Get single powder
routerThree.get("/:id", getPowder);

// Post a new powder
routerThree.post("/", createPowder);

//admin auth 
routerThree.use(requireAdmin)

// PUT (Update) product (replace entire resource)
routerThree.put("/:id", updatePowders);

// Delete a powder
routerThree.delete("/:id", deletePowder);

// Update a powder
routerThree.patch("/:id", updatePowder);

module.exports = routerThree;
