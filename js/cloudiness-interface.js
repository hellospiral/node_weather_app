var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $("#compareClouds").click(function() {
      var city1 = $('#location1').val();
      var city2 = $('#location2').val();
      var city1Clouds;
      var city2Clouds;

      $.get('http://api.openweathermap.org/data/2.5/forecast/city?q=' + city1 + '&appid=' + apiKey).then(function(response) {
          var total = 0;
          for (i = 0; i <= 20; i++) {
              total += response.list[i].clouds.all;
          }
              city1Clouds = Math.ceil(total / 21);
      });

      $.get('http://api.openweathermap.org/data/2.5/forecast/city?q=' + city2 + '&appid=' + apiKey).then(function(response) {
          var total = 0;
          for (i = 0; i <= 20; i++) {
              total += response.list[i].clouds.all;
          }
              city2Clouds = Math.ceil(total / 21);

          if (city1Clouds > city2Clouds) {
              $(".showClouds").html("<p>" + city1 + " ("+ city1Clouds+"% cloudy) will be cloudier than " + city2 + " (" + city2Clouds+"% cloudy) over the next five days.</p>");
          }

          else if (city2Clouds > city1Clouds) {
              $(".showClouds").html("<p>" + city2 + " ("+ city2Clouds+"% cloudy) will be cloudier than " + city1 + " (" + city1Clouds+"% cloudy) over the next five days.</p>");
          }
          else if (city1Clouds === city2Clouds) {
              $(".showClouds").html("<p>" + city1 + " and " +city2+ " both have an average cloudiness of " + city1Clouds + "% over the next five days.</p>");
          }
          else {
              $(".showClouds").html("<p>Please enter city names to compare cloudiness.</p>");
          }
      });
  });
});
