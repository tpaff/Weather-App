function getForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getTime(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#five-day-forecast");

  let forecastHTML = `<div class="forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
            <span class="weather-forecast-day">${getForecastDay(
              forecastDay.dt
            )}</span>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
              height= "42"
            />
            <span class="weather-forecast-temperatures">
              <span class="weather-forecast-max-temperature"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
              <span class="weather-forecast-min-temperature"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
            </span> <br />
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `c3bfba90b1c5452842fe95db5fc692a0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function extractTemperature(response) {
  let newLocation = document.querySelector("#location-found");
  newLocation.innerHTML = `${response.data.name}`;

  let temperatureDisplay = document.querySelector(`#numerical-temperature`);
  temperatureDisplay.innerHTML = `${Math.round(response.data.main.temp)}`;

  // function getFahrenheitTemperature() {
  //   let actualTemperature = document.querySelector("#numerical-temperature");
  //   actualTemperature.innerHTML = `${Math.round(
  //     response.data.main.temp * (9 / 5) + 32
  //   )}`;
  // }
  // let fahrenheitLink = document.querySelector("#fahrenheit-link");
  // fahrenheitLink.addEventListener("click", getFahrenheitTemperature);

  // function getCelciusTemperature() {
  //   let actualTemperature = document.querySelector("#numerical-temperature");
  //   actualTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  // }
  // let celciusLink = document.querySelector("#celcius-link");
  // celciusLink.addEventListener("click", getCelciusTemperature);

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let currentConditionElement = document.querySelector("#current-condition");
  currentConditionElement.innerHTML = `${response.data.weather[0].description}`;

  let windSpeedDisplay = document.querySelector("#wind-speed");
  windSpeedDisplay.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.innerHTML = `${response.data.main.humidity}`;
  getForecast(response.data.coord);
  getTime(response.data.dt * 1000);
}

function search(city) {
  let apiKey = `c3bfba90b1c5452842fe95db5fc692a0`;
  let units = `imperial`;
  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(cityApiUrl).then(extractTemperature);
}
function locationInput(event) {
  event.preventDefault();
  let input = document.querySelector("#location-input");
  let city = `${input.value}`;
  search(city);
}
let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", locationInput);

function currentLocationInput(event) {
  event.preventDefault();

  function showCurrentPosition(response) {
    let lon = response.coords.longitude;
    let lat = response.coords.latitude;
    let apiKey = `c3bfba90b1c5452842fe95db5fc692a0`;
    let units = `metric`;
    let geoLocalUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    console.log(geoLocalUrl);
    axios.get(geoLocalUrl).then(extractTemperature);
  }
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let myLocationForm = document.querySelector("#current-location");
myLocationForm.addEventListener("submit", currentLocationInput);
search("San Francisco");
