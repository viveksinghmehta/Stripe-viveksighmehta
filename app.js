// this is my local server

// Secret Key from stripe
const secretKey = 'sk_test_Aw8X8i2E4jszw8KyM3Npyrcr';

// Publishable Key from stripe
const publishableKey = 'pk_test_A3PxLB8q0wcvXsHcDXOAumwU';


var http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
// var publicDir = require('path').join(__dirname,'/public');
const stripe = require("stripe")("sk_test_yJFKB4KPXfHBwnq03kO3EZxB00A2mnU9iZ");
const bodyParser = require('body-parser');

const morgan = require('morgan');
const db = require("./db");
const location = "locationLog";


app.use(morgan('short'));
app.use(bodyParser.json());
// app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/pay', function(request, response) {
    var stripeToken = request.body.token;
   var charge = stripe.charges.create({
        amount: 200,
        currency: "chf",
        card: stripeToken,
        description: "Charge for jenny.rosen@example.com"
      }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            console.log(JSON.stringify(err, null, 2));
        }
        res.send("completed payment!")
      });
})

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

app.post("/location", function(request, response, next) {
    var lat = request.body.lat
    var long = request.body.long
    let fullString = "Latitude : " +lat+ " longitude : "+long + " "+ Date.now();
    console.log(fullString);
    // next();
    // fs.writeFile("location.txt", function(fullString, error) {
    //     // console.log("Saved to file"+ Date.now());
    // })
    next();
}, function(request, response) {
    console.log("This is next function.");
    response.end("ending the response");
});

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 3000);
console.log('server is up and running');