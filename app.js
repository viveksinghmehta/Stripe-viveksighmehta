// this is my local server

// Secret Key from stripe
const secretKey = 'sk_test_Aw8X8i2E4jszw8KyM3Npyrcr';

// Publishable Key from stripe
const publishableKey = 'pk_test_A3PxLB8q0wcvXsHcDXOAumwU';


var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var publicDir = require('path').join(__dirname,'/public');
const stripe = require('stripe')(secretKey);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
    response.sendfile('profile.html');
});

app.post('/charge', function(request, response) {

});

var httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 3000);
console.log('server is up and running');