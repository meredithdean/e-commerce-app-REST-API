const express = require('express');
const app = express();
const port = process.env.PORT || 3000
require('dotenv/config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');



// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());

// routers
const categoriesRouter = require('./routers/categories');
const productsRouter = require('./routers/products');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');

const api = process.env.API_URL

app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);


// database connection
mongoose.set('strictQuery', false);

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Database connection is ready...')
})
.catch((err) => {
    console.log(err)
});

// server
app.listen(port, () => {
    console.log(`Expresso ☕ is on Port ${ port } Ctrl + C to Stop `); 
});