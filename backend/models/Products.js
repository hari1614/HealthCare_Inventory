const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String },
    productNum: { type: Number },
    quantity: { type: Number },
    unitAndKg: { type: String },
    stock: { type: String },
    mrp: { type: Number },
    price: { type: Number },
    taxPercentage: { type: Number },
    date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Capsule", productSchema);
