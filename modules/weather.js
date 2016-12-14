/**
 * Created by irahmed on 12/14/16.
 */

var when = require("when");
var request = require("request");

module.exports.getWeather = function (place, proxy) {
  if (!place) {
    return when.reject("Missing place. Cannot get weather.");
  }
  return when.promise(function (resolve, reject) {
    resolve("sunny");
  })
};
