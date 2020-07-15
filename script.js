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
var citiesArr = [];
retrieveInfo();
onSearchClick();

// API KEY BY CITY NAME
function onSearchClick() {
  $(".search").on("click", function (event) {
    event.preventDefault();
    //get the city on button click
    var city = $("#city-name").val();
    //TO MAKE THE first letter capitalized =====
    // var city = cityLower.text(str.charAt(0).toUpperCase() + str.substr(1).toLowerCase());
    console.log(city);
    citiesArr.push(city);
    console.log("CITIEs ARR", citiesArr);
    //SET TO/STORE TO LOCAL STORAGE
    localStorage.setItem("cities", JSON.stringify(citiesArr));
    console.log(localStorage);
    retrieveInfo();

    //TO GET CURRENT DATE==============
    var date = moment();
    var dateDisplay = date.format("dddd MMMM Do YYYY");
    $(".current-city-date").empty();
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
    $(".current-city-date").append(newSpanCity, newSpanDate);

    //API CURRENT WEATHER INFO======================
    var queryURLCurrentTemp =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=6930be6df36a7c0ee230985f8b10373e&units=imperial";
    $.ajax({
      url: queryURLCurrentTemp,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var tempFCurrent = Math.ceil(response.main.temp);
      console.log(tempFCurrent);
      $("#temperature").text("Temperature: " + tempFCurrent + "F");
      var humCurrent = response.main.humidity;
      console.log(humCurrent);
      $("#humidity").text("Humidity: " + humCurrent + "%");
      //ACCESS current WIND SPEED
      var windSpeedCurrent = response.wind.speed;
      console.log(windSpeedCurrent);
      $("#wind-speed").text(windSpeedCurrent);
      //ICON current
      var iconCode = response.weather[0].icon;
      console.log(iconCode);
      var iconImageURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
      $("#icon-image").attr("src", iconImageURL);
      //UV
      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
      var uvURL =
        "http://api.openweathermap.org/data/2.5/uvi?appid=6930be6df36a7c0ee230985f8b10373e&units" +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude;
      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        var uvIndex = response.value;
        $("#uv-index").text(uvIndex);

        // UV INDEX BACKGROUND COLOR
        if (uvIndex < 2) {
          $("#uv-index").attr("class", "low");
          console.log("enjoy the outdoors");
        }
        if (uvIndex >= 2 && uvIndex <= 5) {
          $("#uv-index").attr("class", "moderate");
          console.log("wear sunscreen");
        }
        if (uvIndex > 5 && uvIndex <= 7) {
          $("#uv-index").attr("class", "high");
          console.log("better stay indoors");
        }
        if (uvIndex > 7 && uvIndex <= 10) {
          $("#uv-index").attr("class", "very-high");
          console.log("stay in");
        }
        if (uvIndex > 10) {
          $("#uv-index").attr("class", "extreme");
          console.log("real bad");
        }
      });

      //API 5 DAY FORECAST INFO============
      var queryURL =
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=6930be6df36a7c0ee230985f8b10373e";
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        //ACCESS DATE
        //day one date
        var dayOneD = moment(response.list[0].dt_txt);
        var dayOneDate = dayOneD.format("dddd MMMM Do YYYY");
        console.log(dayOneDate);
        $("#day-one-date").text(dayOneDate);
        //day two date
        var dayTwoD = moment(response.list[8].dt_txt);
        var dayTwoDate = dayTwoD.format("dddd MMMM Do YYYY");
        console.log(dayTwoDate);
        $("#day-two-date").text(dayTwoDate);
        //day three date
        var dayThreeD = moment(response.list[16].dt_txt);
        var dayThreeDate = dayThreeD.format("dddd MMMM Do YYYY");
        console.log(dayThreeDate);
        $("#day-three-date").text(dayThreeDate);
        //day four date
        var dayFourD = moment(response.list[24].dt_txt);
        var dayFourDate = dayFourD.format("dddd MMMM Do YYYY");
        console.log(dayFourDate);
        $("#day-four-date").text(dayFourDate);
        //day five date
        var dayFiveD = moment(response.list[32].dt_txt);
        var dayFiveDate = dayFiveD.format("dddd MMMM Do YYYY");
        console.log(dayFiveDate);
        $("#day-five-date").text(dayFiveDate);
        //ACCESS THE HUMIDITY
        //humidity day one
        var humidityDayOne = response.list[0].main.humidity;
        console.log(humidityDayOne);
        $("#hum-day-one").text("Humidity: " + humidityDayOne + "%");
        //humidity day two
        var humidityDayTwo = response.list[8].main.humidity;
        console.log(humidityDayTwo);
        $("#hum-day-two").text("Humidity: " + humidityDayTwo + "%");
        //humidity day three
        var humidityDayThree = response.list[16].main.humidity;
        console.log(humidityDayThree);
        $("#hum-day-three").text("Humidity: " + humidityDayThree + "%");
        //humidity day four
        var humidityDayFour = response.list[24].main.humidity;
        console.log(humidityDayFour);
        $("#hum-day-four").text("Humidity: " + humidityDayFour + "%");
        //humidity day five
        var humidityDayFive = response.list[32].main.humidity;
        console.log(humidityDayFive);
        $("#hum-day-five").text("Humidity: " + humidityDayFive + "%");
        //ICON day one
        console.log(response);
        var iconCodeDayOne = response.list[0].weather[0].icon;
        var iconImageURLDayOne =
          "http://openweathermap.org/img/w/" + iconCodeDayOne + ".png";
        console.log(iconCodeDayOne);
        $("#icon-day-one").attr("src", iconImageURLDayOne);
        //ICON day two
        var iconCodeDayTwo = response.list[8].weather[0].icon;
        var iconImageURLDayTwo =
          "http://openweathermap.org/img/w/" + iconCodeDayTwo + ".png";
        console.log(iconCodeDayTwo);
        $("#icon-day-two").attr("src", iconImageURLDayTwo);
        //ICON day three
        var iconCodeDayThree = response.list[16].weather[0].icon;
        var iconImageURLDayThree =
          "http://openweathermap.org/img/w/" + iconCodeDayThree + ".png";
        console.log(iconCodeDayThree);
        $("#icon-day-three").attr("src", iconImageURLDayThree);
        //ICON day four
        var iconCodeDayFour = response.list[24].weather[0].icon;
        var iconImageURLDayFour =
          "http://openweathermap.org/img/w/" + iconCodeDayFour + ".png";
        console.log(iconCodeDayFour);
        $("#icon-day-four").attr("src", iconImageURLDayFour);
        //ICON day five
        var iconCodeDayFive = response.list[32].weather[0].icon;
        var iconImageURLDayFive =
          "http://openweathermap.org/img/w/" + iconCodeDayFive + ".png";
        console.log(iconCodeDayFive);
        $("#icon-day-five").attr("src", iconImageURLDayFive);
        //WEATHER IN PROPER FARHENHEIT UNIT
        var queryURLTemp =
          "http://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=6930be6df36a7c0ee230985f8b10373e&units=imperial";
        //ACCESS THE 5 day weather temp - display IN CARD1
        $.ajax({
          url: queryURLTemp,
          method: "GET",
        }).then(function (response) {
          console.log(response);
          //day one temp
          var tempFDayOne = Math.ceil(response.list[0].main.temp);
          console.log(tempFDayOne);
          $("#temp-day-one").text("Temperature: " + tempFDayOne + "F");
          //day two temp
          var tempFDayTwo = Math.ceil(response.list[8].main.temp);
          console.log(tempFDayTwo);
          $("#temp-day-two").text("Temperature: " + tempFDayTwo + "F");
          //day three temp
          var tempFDayThree = Math.ceil(response.list[16].main.temp);
          console.log(tempFDayThree);
          $("#temp-day-three").text("Temperature: " + tempFDayThree + "F");
          //day four temp
          var tempFDayFour = Math.ceil(response.list[24].main.temp);
          console.log(tempFDayFour);
          $("#temp-day-four").text("Temperature: " + tempFDayFour + "F");
          //day five temp
          var tempFDayive = Math.ceil(response.list[32].main.temp);
          console.log(tempFDayive);
          $("#temp-day-five").text("Temperature: " + tempFDayive + "F");
        });
      });
    });
  });
}

// //LOCAL STORAGE
//RETRIEVE LOCAL STORAGE INFO
function retrieveInfo() {
  citiesArr = JSON.parse(localStorage.getItem("cities")) || [];
  console.log(" NCA", citiesArr);
  $(".search-history").empty();
  //to make sure there are no duplicates stored
  // //var noDuplicatesArr = [...new Set(citiesArr)];
  //for all elements of the citiesArr stored, create a p tag and append to the search history list
  for (var i = 0; i < citiesArr.length; i++) {
    console.log(citiesArr[i]);
    var pTag = $("<p>");
    pTag.text(citiesArr[i]);
    $(".search-history").prepend(pTag);
    //Add an on click event when one of the ptags are clicked
    //if one of the .search-history children gets clicked, then run the onSearchClick() function
  }
}
