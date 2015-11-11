express = require("express");
http = require("http");
path = require("path");
logger = require("morgan");
bodyParser = require("body-parser");

app = express();


app.set "views", path.resolve __dirname, "views"
app.set "view engine", "jade"

entries = [];
app.locals.entries = entries;

app.use logger "dev"

app.use bodyParser.urlencoded { extended: false }
app.get "/", (req, res) ->
	res.render "index"

app.get "/new-entry", (req, res) ->
	res.render("new-entry")

app.post "/new-entry", (req, res) ->
	if (!req.body.title || !req.body.content)
		res.status(400).send("Entries must have a title and Content.")
		return

	entries.push
		title: req.body.title,
		content: req.body.content,
		published: new Date()

	res.redirect("/")

app.use (req, res) ->
	res.status(404).render("404")

http.createServer(app).listen 3000, ->
	console.log("Guestbook app started on port 3000")


