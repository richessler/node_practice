var express = require('express');

var app = express();

app.get('/', function(req, res){
	res.send('Herro Worrd!');
});

app.listen(3000, function(){
	console.log('Express app pooped on port 3000');
});