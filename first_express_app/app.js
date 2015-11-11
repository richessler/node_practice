var express = require("express");
var path = require("path");
var http = require("http");

var app = express();
var EVIL_IP = "123.45.67.89";

var publicPath = path.resolve(__dirname, "/public");
app.use(express.static(publicPath));

app.use(function(req, res, next) {
	if (req.ip === EVIL_IP) {
		res.status(401).send("GO AWAY, YOU'RE NOT ALLOWED!");
	} else {
		next();
	}
});


app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", function(req, res) {
	res.end("Welcome to my homepage, nerds.");
});

app.get("/about/:student", function(req, res) {
	res.end("The page about: " + req.params.student + "!");
});

app.get("/poop", function(req, res) {
	res.end("Das Pewps!");
});

app.get("/destroy-server", function(req, res){
	res.redirect("/");
});

app.use(function(req, res){
	res.statusCode = 404;
	res.end("404!");
});

http.createServer(app).listen(3000);