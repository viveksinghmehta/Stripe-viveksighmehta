// this is my local server
var http = require('http');
var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('This server is made by vivek singh mehta');
});
var httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 3000);
console.log('server is up and running');