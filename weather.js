//DOM ELEMENTS
var cityDateEl = document.querySelector(".current-city-date");
var cityListEl = document.querySelector(".city-list");
var cityInputEl = document.querySelector(".form-control");
var searchButton = document.querySelector(".button");
//SET VARIABLES
var cities = [];

//TO GET CURRENT DATE and Display it in a new span
var date = moment();
var dateDisplay = date.format("dddd MMMM Do YYYY");

var newDateEl = document.createElement("span");
newDateEl.setAttribute("class", "current-date");
newDateEl.textContent = dateDisplay;
cityDateEl.append(newDateEl);
console.log(newDateEl);

//HOW TO GET GEOLOCATION???
//GET CURRENT CITY and Display it in a new span
// var city =
// var newCityEl = document.createElement("span");
// newCityEl.setAttribute("class", "current-date");
// newCityEl.textContent = city;
// cityDateEl.prepend(newCityEl);
// console.log(newCityEl);

//function to render the new cities in a list
function renderCities() {
  // Clear city element and update city list
  cityListEl.innerHTML = "";
  // Render a new li for each city
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    var li = document.createElement("li");
    var liT = (li.textContent = city);
    console.log(liT);
    li.setAttribute("data-index", i);
    cityListEl.append(li);
  }

  // add eventlistener for enter key
  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    // if the enter key is pressed
    var cityText = cityInputEl.value.trim();
    console.log(cityText);
    cities.push(cityText);
  });
}
