/**
 * Created by irahmed on 12/12/16.
 */

define([
  "jquery", "app/places", "app/Tile", "app/EventTile"
], function ($, Places, Tile, EventTile) {
  var $place = $("#place");
  var $loader = $("#loader");
  var $eventsLoader = $("#eventsLoader");
  var $weatherLoader = $("#weatherLoader");
  var placesContainer = $("#placesContainer");
  var eventsContainer = $("#eventsContainer");
  var weatherContainer = $("#weatherContainer");

  $("#search").keypress(function (e) {
    if (e.which === 13) {
      var place = $(this).val();
      renderPlaces(place);
      renderWeather(place);
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

  function renderWeather(place) {
    weatherContainer.find(".temp").remove();
    weatherContainer.find(".desc").remove();
    $weatherLoader.show();
    weatherContainer.css("visibility", "visible");
    Places.getWeather(place).then(function (data) {
      var temp = $("<div/>").addClass("temp").text(data.weather.main.temp);
      temp.append($("<span/>").addClass("degrees").html("&deg;F"));
      weatherContainer.append(temp);

      var description = data.weather.weather.map(function (desc) {
        return desc.main;
      });
      weatherContainer.append($("<div/>").addClass("desc").text(description.join(", ")));
      $weatherLoader.hide();
      weatherContainer.append(div);
    })
  }
});