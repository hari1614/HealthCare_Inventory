const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const purchaseSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        hsnCode: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        date: { 
            type: Date, 
            required: true,
        },
    }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);
 
module.exports = Purchase;