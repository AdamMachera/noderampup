var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.set("view engine", "vash");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

var controllers = require("./controllers");

controllers.init(app);

http.createServer(app).listen(3000);