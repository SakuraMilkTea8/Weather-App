let now = new Date();
let today = document.querySelector("#current-time");
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weekday = weekdays[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
today.innerHTML = `${weekday}  ${hour}:${minutes}`;

function displayForecast(response) {
  // tomorrow
  document.querySelector("#weather-tomorrow").innerHTML = Math.round(
    response.data.daily[0].feels_like.day
  );
  document
    .querySelector("#weather-icon-tomorrow")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png`
    );

  // day two
  document.querySelector("#weather-daytwo").innerHTML = Math.round(
    response.data.daily[1].feels_like.day
  );
  document
    .querySelector("#weather-icon-daytwo")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`
    );

  // day three
  document.querySelector("#weather-daythree").innerHTML = Math.round(
    response.data.daily[2].feels_like.day
  );
  document
    .querySelector("#weather-icon-daythree")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`
    );

  // day four
  document.querySelector("#weather-dayfour").innerHTML = Math.round(
    response.data.daily[3].feels_like.day
  );
  document
    .querySelector("#weather-icon-dayfour")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`
    );

  // day five
  document.querySelector("#weather-dayfive").innerHTML = Math.round(
    response.data.daily[4].feels_like.day
  );
  document
    .querySelector("#weather-icon-dayfive")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.daily[4].weather[0].icon}@2x.png`
    );

  // day six
  document.querySelector("#weather-daysix").innerHTML = Math.round(
    response.data.daily[5].feels_like.day
  );
  document
    .querySelector("#weather-icon-daysix")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.daily[5].weather[0].icon}@2x.png`
    );
}

function getForecast(coordinates) {
  let apiKey = "5bd1b9f8ce5a0967981cb74bc5f85a4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  // &exclude={part}
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  celciusTemperature = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function chooseCity(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#enter-city").value;
  let apiKey = "5bd1b9f8ce5a0967981cb74bc5f85a4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function loadCity(city) {
  let chosenCity = city;
  let apiKey = "5bd1b9f8ce5a0967981cb74bc5f85a4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchLocation(position) {
  let apiKey = "5bd1b9f8ce5a0967981cb74bc5f85a4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCelciusTemperature);

let celciusTemperature = null;

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
let cityChoice = document.querySelector("form");
cityChoice.addEventListener("submit", chooseCity);
let chosenCity = document.querySelector("#enter-city");

loadCity("Montréal");
