const express = require( 'express' )
const bodyParser = require('body-parser')
const app     = express()
const port    = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true 
})
);

app.use( ( req, res ) => {
    res.type( 'text/plain' )
    res.status( 404 )
    res.send('404 Not found ☕_☕')
    });

app.get( '/' ,(req, res) => {
res.type( 'text/plain' )
res.send( 'Server Expresso ☕' )
});

app.get( '/about', ( req, res ) => {
res.type( 'text/plain' )
res.send( 'Server Expresso ☕ About')
});

app.listen(port,
() => console.log(`Expresso ☕ is on Port ${ port } Ctrl + C to Stop `) );