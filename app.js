

// Secret Key from stripe
const secretKey = 'sk_test_yJFKB4KPXfHBwnq03kO3EZxB00A2mnU9iZ';



var http = require('http');
const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const stripe = require("stripe")("sk_test_yJFKB4KPXfHBwnq03kO3EZxB00A2mnU9iZ");
const bodyParser = require('body-parser');

const morgan = require('morgan');
// const db = require("./db");
const location = "locationLog";


app.use(morgan('short'));
app.use(bodyParser.json());
// app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/pay', function(request, response) {
    var stripeToken = request.body.token;
    var amount = request.body.amount;
    console.log(stripeToken);
    console.log(amount);
   var charge = stripe.charges.create({
        amount: amount * 100,
        currency: "chf",
        card: stripeToken,
        description: "Charge for Vivek Singh Mehta"
      }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            console.log(JSON.stringify(err, null, 2));
        }
        response.json("completed payment!")
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
    response.status(200);
    response.json(newJson);
});

app.post("/location", function(request, response, next) {
    var lat = request.body.lat
    var long = request.body.long
    let fullString = "Latitude : " +lat+ " longitude : "+long + " "+ Date.now();
    console.log(fullString);
    next();
}, function(request, response) {
    console.log("This is next function.");
    response.end("ending the response");
});

app.get("/creativity", function(request, response) {
    response.sendFile(path.join(__dirname + './solid/index.html'));
});

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 3000);
console.log(process.env.PORT)
console.log('server is up and running');