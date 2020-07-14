// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
//user types in a city name
//the cityName is added to a new li
//then added to display
//current and 5 day conditions associated with that cityName are displayed to the cards to the left
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

//DEPENDENCIES================================================
// //SET VARIABLES
//doc ready

// API KEY BY CITY NAME
console.log("I need a break");

$(".search").on("click", function (event) {
  event.preventDefault();
  //get current city and date and display it
  // var currentDate = moment().format();
  // console.log(moment().format());
  //get the city on button click
  var city = $("#city-name").val();
  console.log(city);
  // create an new li for each newCity
  var cityLi = $("<li>");
  cityLi.text(city);
  console.log(cityLi);
  cityLi.attr("class", "list-item");
  console.log(cityLi);
  // and display the newCity in li
  $(".search-history").append(cityLi);

  //TO GET CURRENT DATE
  var date = moment();
  var dateDisplay = date.format("dddd MMMM Do YYYY");
  //create a new span for the city
  var newSpanCity = $("<span>");
  console.log(newSpanCity);
  newSpanCity.text(city);
  newSpanCity.attr("class", "current-city");
  //create a new span for the date
  var newSpanDate = $("<span>");
  console.log(newSpanDate);
  newSpanDate.text(dateDisplay);
  newSpanDate.attr("class", "current-date");
  //display city and date in card-header
  $(".card-header").append(newSpanCity);
  $(".card-header").append(newSpanDate);
  //API
  var queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=6930be6df36a7c0ee230985f8b10373e";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var iconCode = response.list[0].weather[0].icon;
    var iconImage = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    console.log(iconCode);
    $("#.form-control").attr("src", iconImage);
  });
});
// // uv index
// var lat = result.city.coord.lat;
// var lon = result.city.coord.log;
// var uvQueryURL =
//   "http://api.openweathermap.org/data/2.5/uvi?appid=930be6df36a7c0ee230985f8b10373e&lat=" +
//   lat +
//   "&lon=" +
//   lon;
// $.ajax({
//   url: uvQueryURL,
//   method: "GET",
// }).then(function (response) {
//   var uvIndex = response.value;
//   $("#uv-index").text("UV Index: " + uvIndex);
//   if (uvIndex < 2) {
//     $(".index").attr("class", "low");
//     console.log("You're safe!");
//   }
//   if (uvIndex >= 2 && uvIndex <= 5) {
//     $(".index").attr("class", "moderate");
//     console.log("Getting risky");
//   }
//   if (uvIndex > 5 && uvIndex <= 7) {
//     $(".index").attr("class", "high");
//     console.log("Uh oh!");
//   }
//   if (uvIndex > 7 && uvIndex <= 10) {
//     $(".index").attr("class", "very-high");
//     console.log("You better stay inside!");
//   }
//   if (uvIndex > 10) {
//     $("#.index").attr("class", "extreme");
//     console.log("You will ignite on fire");
//   }
// });
// //LOCAL STORAGE
// //submit user score
// console.log(city);
// var userInfo = {
//   userName: userName.value,
// };
// // store user input
// localStorage.setItem("City", JSON.stringify(city));
// var newCityInfo = JSON.parse(localStorage.getItem(city));

// API KEY BY CITY NAME 5 day forecast

//DOM Elements
//Initial DATA
//FUNCTIONS====================================================
//USER INPUT===================================================
//A user types a city
//A user submits their search
//A users search history is saved
//then the currrent weather of that city shows up
//they see the city name,
//the date,
//an icon representation of weather conditions,
//the temperature,
//the humidity,
//the wind speed,
//and the UV index
//based on the UV Index
//the color is green for favorable
//the color is purple for moderate
//the color is red for severe
//They also see the 5 day forecast of their city that they searched
//the date,
//an icon representation of weather conditions,
//the temperature,
//and the humidity
//If the user searches for another city, then their past city search is saved
//The user can click on past city searches and view the weather
//Display Data
