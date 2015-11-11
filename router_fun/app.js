var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

var app = express();
var weather = new ForecastIo("3a4d55ecb0ba92e067cdd724fc95f0b6");

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "jade");

app.get("/", function(req, res) {
    res.render("index");
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if (!location.zipcode) {
        next();
        return;
    }
    var latitude = location.latitude;
    var longitude = location.longitude;
    weather.forecast(latitude, longitude, function(err, data) {
        if (err) {
            next();
            return;
        }
        res.json({
        zipcode: zipcode,
            temperature: data.currently.temperature
        });
    });
});

app.use(function(req, res) {
    res.status(404).render("404");
});

app.listen(3000);