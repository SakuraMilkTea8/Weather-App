let now = new Date();
let today = document.querySelector("#current-time");
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

//

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  console.log(response.data);
}

function chooseCity(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#enter-city").value;

  let apiKey = "5bd1b9f8ce5a0967981cb74bc5f85a4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let chosenCity = document.querySelector("#enter-city");
let cityChoice = document.querySelector("form");
cityChoice.addEventListener("submit", chooseCity);

function searchLocation(position) {
  let apiKey = "5bd1b9f8ce5a0967981cb74bc5f85a4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
