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
function getTime() {
  let day = days[now.getDay()];
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${day} `;
  let hour = now.getHours();
  let minute = now.getMinutes();
  minute = minute.toString();
  if (minute.length !== 2) {
    minute = `0${minute}`;
  }
  let currentTime = document.querySelector("#exact-time");
  currentTime.innerHTML = `${hour}:${minute}`;
}
getTime();

function getGeoLocal(response) {
  let newLocation = document.querySelector("#location-found");
  newLocation.innerHTML = `${response.data.name}`;
  let temperatureDisplay = document.querySelector(`#numerical-temperature`);
  temperatureDisplay.innerHTML = `${Math.round(response.data.main.temp)}`;
  function getFahrenheitTemperature() {
    let actualTemperature = document.querySelector("#numerical-temperature");
    actualTemperature.innerHTML = `${Math.round(
      response.data.main.temp * (9 / 5) + 32
    )}`;
  }
  function getCelciusTemperature() {
    let actualTemperature = document.querySelector("#numerical-temperature");
    actualTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  }
  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", getCelciusTemperature);
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", getFahrenheitTemperature);
}
function showCurrentPosition(response) {
  let lon = response.coords.longitude;
  let lat = response.coords.latitude;
  let apiKey = `c3bfba90b1c5452842fe95db5fc692a0`;
  let units = `metric`;
  let geoLocalUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(geoLocalUrl).then(getGeoLocal);
}
navigator.geolocation.getCurrentPosition(showCurrentPosition);
function findNewTemp(response) {
  console.log(response);
  let newLocation = document.querySelector("#location-found");
  newLocation.innerHTML = `${response.data.name}`;
  let temperatureDisplay = document.querySelector(`#numerical-temperature`);
  temperatureDisplay.innerHTML = `${Math.round(response.data.main.temp)}`;
  function getFahrenheitTemperature() {
    let actualTemperature = document.querySelector("#numerical-temperature");
    actualTemperature.innerHTML = `${Math.round(
      response.data.main.temp * (9 / 5) + 32
    )}`;
  }
  function getCelciusTemperature() {
    let actualTemperature = document.querySelector("#numerical-temperature");
    actualTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  }
  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", getCelciusTemperature);
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", getFahrenheitTemperature);
}

function locationInput(event) {
  event.preventDefault();
  console.log(event);
  let location = document.querySelector("#location-input");
  let locationFound = document.querySelector("#location-found");
  locationFound.innerHTML = `${location.value}`;
  // alert(`${location.value}`);
  let cityName = `${location.value}`;
  console.log(typeof cityName);
  let apiKey = `c3bfba90b1c5452842fe95db5fc692a0`;
  let units = `metric`;
  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(cityApiUrl).then(findNewTemp);
}

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", locationInput);
