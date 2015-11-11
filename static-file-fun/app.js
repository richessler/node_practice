var express = require("express");
var path = require("path");
var logger = require("morgan");

var app = express();


var filePath = path.join(__dirname, "static/asdfasdf.mp3");
app.use(function(err, req, res, next){
	res.sendFile(filePath, function(err){
		console.error(err);
		next(error);
	});
});

app.use(function(err, req, res, next) {
	res.status(500);
	res.send("Internal server error.");
});

app.listen(3000, function(){
	console.log("App started on port 3000.");
});