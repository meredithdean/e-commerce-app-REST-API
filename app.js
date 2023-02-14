const express = require('express');
const app = express();
const port = process.env.PORT || 3000
require('dotenv/config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const api = process.env.API_URL

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
});

const Product = mongoose.model('Product', productSchema);

app.get(`${api}/products`, async (req, res) => {
    const productList = await Product.find()
    if(!productList) {
        res.status(500).json({success: false})
    }
    res.send(productList)
});

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct) => {
        res.status(201).json(createdProduct)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
    
});

mongoose.set('strictQuery', false);

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Database connection is ready...')
})
.catch((err) => {
    console.log(err)
});

app.listen(port, () => {
    console.log(`Expresso ☕ is on Port ${ port } Ctrl + C to Stop `); 
});