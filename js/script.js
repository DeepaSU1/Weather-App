var apiKey = 'abd3e178effe95c92c1e0d31d2eccc60';
var city = 'London';
var lastCitySearched;
var storedCities;
var cities = [];

if (localStorage.getItem("cities")) {
  storedCities = JSON.parse(localStorage.getItem("cities"));
  console.log(storedCities);
  for (var i = 0; i < storedCities.length; i++) {
    lastCitySearched = storedCities.length - 1;
    var lastCity = storedCities[lastCitySearched];
  }
} else {
  cities;
}


console.log("cities", cities);

// City searched and stored in local storage
$("#search-city").on("click", function (event) {
  event.preventDefault();
  // get value of city input
  var city = $("#city-input").val();
  console.log(city);
  //save city in cities array
  cities.push(city);
  //store cities in localStorage
  localStorage.setItem("cities", JSON.stringify(cities));

  $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(function (currentData) {
      var lon = currentData.coord.lon;
      var lat = currentData.coord.lat;

      var cityItem = $("<li>");
      cityItem.addClass("list-group-item city-item");
      cityItem.text(currentData.name);
      cityItem.attr("lat", currentData.coord.lat);
      cityItem.attr("lon", currentData.coord.lon);
      $("#city-list").prepend(cityItem);

      // When city item is clicked, re render info and forecast
      cityItem.on("click", function () {
        lat = $(this).attr("lat");
        lon = $(this).attr("lon");
        showCityName(currentData);
        sendCityInfo(lat, lon);
      });
      
      console.log(`
      _____Current Conditions_____
      Temp: ${Math.round(currentData.main.temp)} Cº
      Wind: ${currentData.wind.speed} M/S
      Humidity: ${currentData.main.humidity}%
    `);
      $("#temperature").text(`Temperature: ${Math.round(currentData.main.temp)}Cº`);
      $("#humidity").text(`Humidity: ${currentData.main.humidity}%`);
      $("#wind-speed").text(`Wind Speed: ${currentData.wind.speed} MPH`);
      showCityName(currentData);
      sendCityInfo(lat, lon);
    });

});
  
function showCityName(currentData) {
  console.log(currentData.name);

  //get current date
  var currentDate = moment().format("DD/MM/YYYY");
  // render city name, current date and weather icon
  $(".card-title").text(`${currentData.name} (${currentDate})`);
  var weatherIcon = $("<img>");
  var iconCode = currentData.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  weatherIcon.attr("src", iconUrl);
  $(".card-title").append(weatherIcon);

}
// WHEN I view current weather conditions for that city ds
function sendCityInfo(lat, lon) {
  console.log(lat, lon);
  $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(function (forecastData) {
      console.log(forecastData);
      console.log(forecastData.list.dt_txt);
      // render 5-Day Forecast
      viewForecast(forecastData);
    });

   }


function viewForecast(forecastData) {
  console.log(forecastData.list);
  $("#forecast").empty();
  // Render 5-day forecast
  // var n = 5;
  var days = forecastData.list;
  // get the 2nd - 6th index of the daily array of the response
  days.map((day) => {
    var dayCard = $("<div>");
    dayCard.addClass("card col-md-4 daycard");
    // dayCard.css("width", "18rem");
    dayCard.css("background-color", "lightblue");
    dayCard.css("margin-right", "5px");
    dayCard.css("font-size", "15px");

    var dayCardBody = $("<div>");
    dayCardBody.addClass("card-body");
    dayCard.append(dayCardBody);

    var dayCardName = $("<h6>");
    dayCardName.addClass("card-title");
    // take the date of the response object and format it to (DD/MM/YYYY)
    var datestamp = moment.unix(day.dt);
    var forecastDate = datestamp.format("DD/MM/YYYY HH:mm");
    dayCardName.text(forecastDate);
    dayCardBody.append(dayCardName);

    //take the icon of the response object and set the url to the src of the iconURL
    var weatherIcon = $("<img>");
    var iconCode = day.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    weatherIcon.attr("src", iconUrl);
    dayCardBody.append(weatherIcon);

    var dayTemp = $("<p>");
    dayTemp.text(`Temp: ${day.main.temp} Cº`);
    dayCardBody.append(dayTemp);

    var dayHumidity = $("<p>");
    dayHumidity.text(`Humidity: ${day.main.humidity}%`);
    dayCardBody.append(dayHumidity);

    $("#forecast").append(dayCard);
  });
}