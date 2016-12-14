/**
 * Created by irahmed on 12/12/16.
 */

define([
  "jquery", "app/http"
], function ($, http) {
  function Places() {
  }

  Places.prototype.getWeather = function (place) {
    return http.get("/weather", {place: place});
  };

  Places.prototype.getThings = function (place) {
    return http.get("/thingstodo", {place: place});
  };

  Places.prototype.getPhotos = function (data) {
    console.debug("Getting Photo : ", data);
    data.height = 250;
    return http.get("/photos", data)
  };

  return new Places();
});