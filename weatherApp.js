function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input").value;

  if (searchInput) {
    getWeatherData(searchInput);
  } else {
    alert("Please type a city");
  }
}

function getCurrentLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getWeatherDataByCoordinates(latitude, longitude);
    });
  } else {
    alert("Geolocation is not available in your browser.");
  }
}

function updateCityName(cityName) {
  let h1 = document.querySelector("#city-name");
  h1.textContent = cityName;
}

function updateTemperature(temperature) {
  let h2 = document.querySelector("#location-temperature");
  let roundedTemperature = Math.round(temperature);
  h2.textContent = `${roundedTemperature}°C`;
}

function getWeatherData(city) {
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    let cityName = response.data.name;
    let temperature = response.data.main.temp;
    updateCityName(cityName);
    updateTemperature(temperature);
  });
}

function getWeatherDataByCoordinates(latitude, longitude) {
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    let cityName = response.data.name;
    let temperature = response.data.main.temp;
    updateCityName(cityName);
    updateTemperature(temperature);
  });
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dateElement = document.querySelector("#weather-Date");
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let month = monthName[now.getMonth()];
let date = now.getDate();
dateElement.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;
