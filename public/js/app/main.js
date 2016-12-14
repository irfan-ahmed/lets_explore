/**
 * Created by irahmed on 12/12/16.
 */

define([
  "jquery", "app/places", "app/Tile"
], function ($, Places, Tile) {
  var $place = $("#place");
  var $loader = $("#loader");
  $("#search").keypress(function (e) {
    if (e.which === 13) {
      var container = $("#resultsContainer");
      container.find(".tile").remove();
      $loader.show();
      var place = $(this).val();
      Places.getWeather(place).then(function (weather) {
        console.debug("Weather:", weather);
      });

      Places.getThings(place).then(function (results) {
        console.debug("ToDo: ", results);
        results.list.forEach(function (place) {
          if (place.photos && place.photos.length) {
            var tile = new Tile(place, $("#resultsContainer"));
            tile.render();
          }
          $loader.hide();
        })
      })
    }
  })
});