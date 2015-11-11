var express = require('express');
var app = express();

app.get('/olivia', function(req, res) {
	res.send("Welcome to Olivia's homepage!");
});

app.get(/^\/users\/(\d+)-(\d+$/, function(req,res){
	var userId = parseInt(req.params.userid, 10);
	var endId = parseInt(req.params[1], 10);
});

app.use(function(req, res){
	res.status(404).send("page not found");
});

app.listen(3000);