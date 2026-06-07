const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb://127.0.0.1:27017/productsdb"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/api/products", async (req, res) => {

    const products = await Product.find();

    res.json(products);
});

// CREATE
app.post("/api/products", async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});

// UPDATE
app.put("/api/products/:id", async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedProduct);
});

// DELETE
app.delete("/api/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
        message: "Product Deleted"
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});