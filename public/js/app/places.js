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

  Places.prototype.listSights = function (place) {
    return http.get("/thingstodo", {place: place});
  };

  Places.prototype.getPhotos = function (data) {
    console.debug("Getting Photo : ", data);
    data.height = 250;
    return http.get("/photos", data)
  };

  Places.prototype.listEvents = function (place, type) {
    console.debug("Getting Events", place, type);
    return http.get("/events", {
      city: place,
      type: type
    })
  };

  return new Places();
});