const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/productModel");

const app = express();

//middleware to access json data type; parse or read json objects passed into requests
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//connect to db
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

    //routes - to run this app in a browser 
//home route
app.get('/', (req, res) => {
    res.send("Welcome to homepage!")
})

    //now to CRUD - Create, Read, Update and Delete

    //example - PRODUCTS
//to add an element or product to database (CREATE)
app.post('/product', async (req, res) => {
    //to save data into db
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})


//to fetch data FROM database (READ)
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});//get or fetch all data or products
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//fetch one data from db by id (READ)
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const oneProduct = await Product.findById(id);
        res.status(200).json(oneProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//edit data ( a product, in this case) in db (UPDATE)
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //if product with such id cannot be found in database
        if(!product) {
            return res.status(404).json({message: `cannot find product with id ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//deleta a product or data from the db
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message: `cannot find any product with this id ${id}, hence, no deletion was made.`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.listen(3030, () => {
    console.log("CRUD API is running on port 3030");
})