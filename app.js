// this is my local server

// Secret Key from stripe
const secretKey = 'sk_test_Aw8X8i2E4jszw8KyM3Npyrcr';

// Publishable Key from stripe
const publishableKey = 'pk_test_A3PxLB8q0wcvXsHcDXOAumwU';


var http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
var publicDir = require('path').join(__dirname,'/public');
const stripe = require('stripe')(secretKey);
const bodyParser = require('body-parser');

const morgan = require('morgan')


app.use(morgan('short'))
app.use(bodyParser.json());
app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/user", function (request, response) {
    let userJson = {firstName: "Vivek", lastName: "Mehta"}
    response.json(userJson)
})

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 3000);
console.log('server is up and running');