/**
 * Created by irahmed on 12/13/16.
 */

var when = require("when");
var request = require("request");

var API_KEY = "AIzaSyB5ZfCFU0siDE1Cuvi2wez7mvlkLn4w6gY";

module.exports.photos = function (params, proxy) {
  var ref = params.photo_reference;
  if (!ref) {
    return when.reject("Missing photo reference");
  }
  var width = params.width;
  var height = params.height;
  if (!width && !height) {
    height = 250;
  }

  var url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + ref + "&key=" + API_KEY;
  if (width) {
    url += "&maxwidth=" + width;
  }
  if (height) {
    url += "&maxheight=" + height;
  }
  return when.resolve(url);
};

module.exports.sightsToSee = function (place, proxy) {
  if (!place) {
    return when.reject("Please specify the name of a place to visit");
  }
  var query = encodeURIComponent(place + " point of interest");
  var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query +
    "&language=en&key=" + API_KEY;
  console.log("Getting places to see for :", url);
  return when.promise(function (resolve, reject) {
    var settings = {
      url: url
    };
    if (proxy) {
      settings.proxy = options.proxy;
    }
    request(settings, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        var list = data.results.filter(function (sight) {
          return (sight.photos !== undefined && (sight.rating !== undefined));
        });
        list.sort(function (p1, p2) {
          return p2.rating - p1.rating;
        });
        resolve(list);
      }
      if (error) {
        reject(error);
      }
    });
  })
};

