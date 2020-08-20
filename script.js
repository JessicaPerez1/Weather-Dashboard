//SET VARIABLES
var cityUl = $(".search-history");
var citiesArr = [];
retrieveInfo();
onSearchClick();

//API KEY BY CITY NAME ==================
function onSearchClick() {
  $(".search").on("click", function (event) {
    event.preventDefault();
    //get the city's value on button click
    var city = $("#city-name").val();
    console.log(city);
    //TO MAKE THE first letter capitalized =====
    // var city = cityLower.text(str.charAt(0).toUpperCase() + str.substr(1).toLowerCase());
    //add the city entered at the end of the citiesArr
    citiesArr.push(city);
    //SET TO/STORE TO LOCAL STORAGE
    localStorage.setItem("cities", JSON.stringify(citiesArr));
    console.log(localStorage);
    retrieveInfo();

    //GET CURRENT DATE AND CITY - THEN DISPLAY==================
    var date = moment();
    var dateDisplay = date.format("dddd MMMM Do YYYY");
    $(".current-city-date").empty();
    //create a new span for the city
    var newSpanCity = $("<span>");
    //add content
    newSpanCity.text(city);
    newSpanCity.attr("class", "current-city");
    //create a new span for the date
    var newSpanDate = $("<span>");
    //add content
    newSpanDate.text(dateDisplay);
    newSpanDate.attr("class", "current-date");
    //display city and date in card-header
    $(".current-city-date").append(newSpanCity, newSpanDate);

    //API CURRENT WEATHER INFO ======================
    var queryURLCurrentTemp =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=6930be6df36a7c0ee230985f8b10373e&units=imperial";
    $.ajax({
      url: queryURLCurrentTemp,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      //access temp info in api object and display it
      var tempFCurrent = Math.ceil(response.main.temp);
      $("#temperature").text("Temperature: " + tempFCurrent + "F");
      //access humidity and display it
      var humCurrent = response.main.humidity;
      $("#humidity").text("Humidity: " + humCurrent + "%");
      //CURRENT WIND SPEED
      //access wind speed info and display it
      var windSpeedCurrent = response.wind.speed;
      $("#wind-speed").text(windSpeedCurrent);
      //CURRENT ICON
      //access icon info and display it
      var iconCode = response.weather[0].icon;
      var iconImageURL =
        "https://openweathermap.org/img/w/" + iconCode + ".png";
      $("#icon-image").attr("src", iconImageURL);
      //CURRENT UV INDEX
      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
      var uvURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=6930be6df36a7c0ee230985f8b10373e&units" +
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
        //uv background color change depending on index level
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

      //API 5 DAY FORECAST INFO ====================
      var queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=6930be6df36a7c0ee230985f8b10373e";
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        //ACCESS DATES FOR 5 FOLLOWING DAYS
        //day one date access and display
        var dayOneD = moment(response.list[0].dt_txt);
        var dayOneDate = dayOneD.format("dddd MMMM Do YYYY");
        $("#day-one-date").text(dayOneDate);
        //day two date
        var dayTwoD = moment(response.list[8].dt_txt);
        var dayTwoDate = dayTwoD.format("dddd MMMM Do YYYY");
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
        //ACCESS THE HUMIDITY FOR 5 FOLLOWING DAYS
        //humidity day one access and display
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
        //ACCESS ICON FOR 5 FOLLOWING DAYS
        //icon day one access and display
        var iconCodeDayOne = response.list[0].weather[0].icon;
        var iconImageURLDayOne =
          "https://openweathermap.org/img/w/" + iconCodeDayOne + ".png";
        console.log(iconCodeDayOne);
        $("#icon-day-one").attr("src", iconImageURLDayOne);
        //icon day two
        var iconCodeDayTwo = response.list[8].weather[0].icon;
        var iconImageURLDayTwo =
          "https://openweathermap.org/img/w/" + iconCodeDayTwo + ".png";
        $("#icon-day-two").attr("src", iconImageURLDayTwo);
        //icon day three
        var iconCodeDayThree = response.list[16].weather[0].icon;
        var iconImageURLDayThree =
          "https://openweathermap.org/img/w/" + iconCodeDayThree + ".png";
        $("#icon-day-three").attr("src", iconImageURLDayThree);
        //icon day four
        var iconCodeDayFour = response.list[24].weather[0].icon;
        var iconImageURLDayFour =
          "https://openweathermap.org/img/w/" + iconCodeDayFour + ".png";
        $("#icon-day-four").attr("src", iconImageURLDayFour);
        //icon day five
        var iconCodeDayFive = response.list[32].weather[0].icon;
        var iconImageURLDayFive =
          "https://openweathermap.org/img/w/" + iconCodeDayFive + ".png";
        console.log(iconCodeDayFive);
        $("#icon-day-five").attr("src", iconImageURLDayFive);
        //API WEATHER 5 DAY FORECAST IN PROPER FARHENHEIT UNIT ==================
        var queryURLTemp =
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=6930be6df36a7c0ee230985f8b10373e&units=imperial";
        $.ajax({
          url: queryURLTemp,
          method: "GET",
        }).then(function (response) {
          console.log(response);
          //day one temp access and display
          var tempFDayOne = Math.ceil(response.list[0].main.temp);
          $("#temp-day-one").text("Temperature: " + tempFDayOne + "F");
          //day two temp
          var tempFDayTwo = Math.ceil(response.list[8].main.temp);
          $("#temp-day-two").text("Temperature: " + tempFDayTwo + "F");
          //day three temp
          var tempFDayThree = Math.ceil(response.list[16].main.temp);
          $("#temp-day-three").text("Temperature: " + tempFDayThree + "F");
          //day four temp
          var tempFDayFour = Math.ceil(response.list[24].main.temp);
          $("#temp-day-four").text("Temperature: " + tempFDayFour + "F");
          //day five temp
          var tempFDayive = Math.ceil(response.list[32].main.temp);
          $("#temp-day-five").text("Temperature: " + tempFDayive + "F");
        });
      });
    });
  });
}

// LOCAL STORAGE =========================
//retrieve local storage info
function retrieveInfo() {
  citiesArr = JSON.parse(localStorage.getItem("cities")) || [];
  $(".search-history").empty();
  //to make sure there are no duplicates stored
  //var noDuplicatesArr = [...new Set(citiesArr)];
  //display retrieved info to my page - loop through citiesArr
  for (var i = 0; i < citiesArr.length; i++) {
    console.log(citiesArr[i]);
    var pTag = $("<p>");
    pTag.text(citiesArr[i]);
    //last city searched appears first
    var lastCitySearched = $(".search-history").prepend(pTag);
    var city = $("#city-name").val();
    $(city).text(lastCitySearched);
    //WHEN A PTAG IS CLICKED...
    pTag.on("click", function (event) {
      event.preventDefault();
      var element = event.target;
      console.log(element);
      var textPtag = element.textContent;
      console.log(textPtag);
      //display to input
      $("#city-name").val(textPtag);
    });
  }
}

//WHEN PAGE REFRESHED, LOAD LAST CITY SEARCH TO INPUT and DISPLAY
var lastCitySearched = citiesArr[citiesArr.length - 1];
console.log(lastCitySearched);
$("#city-name").val(lastCitySearched);
