const mongoose = require("mongoose");

//to create schema which is info or data about what will be in the model
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false
        }
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;