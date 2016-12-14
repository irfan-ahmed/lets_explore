/**
 * Created by irahmed on 12/12/16.
 */

var express = require('express');
var bodyParser = require("body-parser");

var google = require("./modules/google");
var weather = require("./modules/weather");
var events = require("./modules/events");

var options = require("minimist")(process.argv.slice(2));
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// static content
app.use("/explorer/", express.static("public"));

app.get('/api/place/thingstodo', function (req, res) {
  google.sightsToSee(req.query.place, options.proxy).then(function (results) {
    res.json({place: req.query.place, list: results});
  }).catch(function (e) {
    res.status(500, {place: req.query.place, error: e});
  });
});

app.get("/api/place/details", function (req, res) {
  google.placeDetails(req.query, options.proxy).then(function (details) {
    res.json(details);
  }).catch(function (e) {
    res.status(500, {error: e});
  })
});

app.get("/api/place/time", function (req, res) {
  google.timeDetails(req.query, options.proxy).then(function (details) {
    res.json(details);
  }).catch(function (e) {
    res.status(500, {error: e});
  })
});

app.get("/api/photos", function (req, res) {
  google.photos(req.query, options.proxy).then(function (url) {
    res.json({src: url});
  }).catch(function (e) {
    res.status(500, {error: e});
  })
});

app.get("/api/weather", function (req, res) {
  weather.getWeather(req.query, options.proxy).then(function (weatherData) {
    res.json({weather: weatherData});
  }).catch(function (e) {
    res.status(500, {error: e});
  })
});

app.get("/api/events", function (req, res) {
  events.listEvents(req.query, options.proxy).then(function (events) {
    res.json({events: events});
  }).catch(function (e) {
    res.status(500, {error: e});
  })
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

