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
})

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: 'hair dresser',
        image: 'some_url',
    }
    res.send(product)
});

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    res.send(newProduct)
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