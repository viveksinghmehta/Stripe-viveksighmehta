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

const morgan = require('morgan');


app.use(morgan('short'));
app.use(bodyParser.json());
app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/user", function (request, response) {
    let userJson = {
        "id": "0001",
        "type": "donut",
        "name": "Cake",
        "ppu": 0.55,
        "batters":
            {
                "batter":
                    [
                        { "id": "1001", "type": "Regular" },
                        { "id": "1002", "type": "Chocolate" },
                        { "id": "1003", "type": "Blueberry" },
                        { "id": "1004", "type": "Devil's Food" }
                    ]
            },
        "topping":
            [
                { "id": "5001", "type": "None" },
                { "id": "5002", "type": "Glazed" },
                { "id": "5005", "type": "Sugar" },
                { "id": "5007", "type": "Powdered Sugar" },
                { "id": "5006", "type": "Chocolate with Sprinkles" },
                { "id": "5003", "type": "Chocolate" },
                { "id": "5004", "type": "Maple" }
            ]
    };
    response.json(userJson);
});

app.get("/json", function(request, response) {
    let newJson = {
        "id": "0001",
        "type": "donut",
        "name": "Cake",
        "image":
            {
                "url": "images/0001.jpg",
                "width": 200,
                "height": 200
            },
        "thumbnail":
            {
                "url": "images/thumbnails/0001.jpg",
                "width": 32,
                "height": 32
            }
    }
    response.json(newJson);
});

app.post("/location", function(request, response) {
    var lat = request.body.lat
    var long = request.body.long
    let fullString = "Latitude : " +lat+ " longitude : "+long + Date.now();
    console.log("Latitude : " +lat+ " longitude : "+long);
    fs.writeFile("location.txt", function(fullString, error) {
        console.log("Saved to file");
    })
    response.end(fullString);
});

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 3000);
console.log('server is up and running');