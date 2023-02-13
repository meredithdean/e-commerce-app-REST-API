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

mongoose.connect('mongodb+srv://mongo:mongo@cluster0.ct6t2fu.mongodb.net/?retryWrites=true&w=majority')

app.listen(port, () => {
    console.log(`Expresso ☕ is on Port ${ port } Ctrl + C to Stop `); 
});