/**
 * Created by irahmed on 12/12/16.
 */

define([
  "jquery", "app/places", "app/Tile", "app/EventTile"
], function ($, Places, Tile, EventTile) {
  var $place = $("#place");
  var $loader = $("#loader");
  var $eventsLoader = $("#eventsLoader");
  var placesContainer = $("#placesContainer");
  var eventsContainer = $("#eventsContainer");
  var weatherContainer = $("#weatherContainer");

  $("#search").keypress(function (e) {
    if (e.which === 13) {
      var place = $(this).val();
      renderPlaces(place);
      renderEvents(place);
    }
  });

  function renderPlaces(place) {
    placesContainer.find(".tile").remove();
    $loader.show();

    Places.listSights(place).then(function (results) {
      console.debug("ToDo: ", results);
      $loader.hide();
      results.list.forEach(function (place) {
        var tile = new Tile(place, $("#placesContainer"));
        tile.render();
      })
    })
  }

  function renderEvents(place) {
    eventsContainer.find(".event").remove();
    $eventsLoader.show();
    eventsContainer.css("visibility", "visible");
    Places.listEvents(place).then(function (data) {
      console.debug("Got Events for", place, data);
      data.events.forEach(function (event) {
        var eventRow = new EventTile(event, eventsContainer);
        eventRow.render();
      });
      $eventsLoader.hide();
    })
  }
});