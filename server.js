/**
 * Created by irahmed on 12/12/16.
 */

var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var https = require("https");
var API_KEY = "AIzaSyB5ZfCFU0siDE1Cuvi2wez7mvlkLn4w6gY";
var when = require("when");
var request = require("request");
var options = require("minimist")(process.argv.slice(2));
console.log("Options: ", options);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// static content
app.use(express.static("public"));

app.get('/api/thingstodo', function (req, res) {
  search(req.query.place).then(function (results) {
    res.json({place: req.query.place, list: results});
  }).catch(function (e) {
    res.status(500, {place: req.query.place, error: e});
  });
});

app.get("/api/photos", function (req, res) {
  console.log(req.query);
  var ref = req.query.photo_reference;
  var width = req.query.width;
  var height = req.query.height;
  var url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + ref + "&key=" + API_KEY;
  if (width) {
    url += "&maxwidth=" + width;
  }
  if (height) {
    url += "&maxheight=" + height;
  }
  console.log("Photos Url: ", url);
  res.json({place: req.query.place, src: url})
});

app.get("/api/weather", function (req, res) {
  res.json({place: req.query.place, weather: "Sunny"});
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

function search(place) {
  var list = [];
  var key = API_KEY;
  var query = encodeURIComponent(place + " point of interest");
  console.log("Location : ", query);
  var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query +
    "&language=en&key=" + API_KEY;
  console.log(url);
  return when.promise(function (resolve, reject) {
    var settings = {
      url: url
    };
    if (options.proxy) {
      settings.proxy = options.proxy;
    }
    request(settings, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("Got Response");
        var data = JSON.parse(body);
        data.results.sort(function (p1, p2) {
          if (!p1.rating || !p2.rating) {
            return 1;
          }
          return p2.rating - p1.rating;
        });
        resolve(data.results);
      }
      if (error) {
        reject(error);
      }
    });
  })
}

