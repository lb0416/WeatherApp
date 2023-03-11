//CLOCK and Date
let h2 = document.querySelector("h2");
let now = new Date();
h2.innerHTML = formatDate(now);

function formatDate(date) {
  let dateDay = now.getDate();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Where you are is: ${day} ${dateDay} ${month}, ${hours}:${minutes}`;
}

function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"];
return days [day];
}

//Search Form
function changeCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let locationInput = document.querySelector("#location-input");
  h1.innerHTML = `${locationInput.value}`;
  console.log(locationInput.value);
  let apiKey = "5f7905da385tefb6942o90bcb57f0ab1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${locationInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

//Forecast API
function getForecast(coordinates) {
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiKey = "5f7905da385tefb6942o90bcb57f0ab1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
  console.log(apiUrl);
}

//Real Data API
function showTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.city;

  let temperature = Math.round(response.data.temperature.current);
  let realTemp = document.querySelector("#temp");
  realTemp.innerHTML = temperature;

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `It feels like ${Math.round(
    response.data.temperature.feels_like
  )}°`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let humid = document.querySelector("#humid");
  humid.innerHTML = `Humidity is ${response.data.temperature.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind is ${Math.round(response.data.wind.speed)} mph`;

  let icon = response.data.condition.icon;
  let currentWeatherIcon = document.querySelector(`#icon`);
  currentWeatherIcon.setAttribute(
    `src`,
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );

  getForecast(response.data.coordinates);
}

//Forecast
function showForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecast = response.data.daily;
  console.log(forecast);

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6){
    forecastHTML =
      forecastHTML +
      `   
      <div class="col-2">
          <div class="weather-forecast-date">
           ${formatDay(forecastDay.time)}
          </div>
            <img src=${forecastDay.condition.icon_url} alt="" width="43">
              <div class="weather-forecast-temperature">
              <span class="weather-forecast-maximum"> 
                ${Math.round(forecastDay.temperature.maximum)}°
              </span>
          |
              <span class="weather-forecast-minimum"> 
              ${Math.round(forecastDay.temperature.minimum)}°
              </span>
          </div>
        </div>
    `;}
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Current Location Button
function currentPosition() {
  navigator.geolocation.getCurrentPosition(getCurrentCity);
}

function getCurrentCity(position) {
  console.log(position);
  let apiKey = "5f7905da385tefb6942o90bcb57f0ab1";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlGeo = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrlGeo).then(showTemperature);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", currentPosition);

//celcius-fahrenheit
function celusToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let celcius = temperature.innerHTML;
  temperature.innerHTML = Math.round(celcius * 1.8 + 32);
}
function fahrenheitToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let fahrenheit = temperature.innerHTML;
  temperature.innerHTML = Math.round(((fahrenheit - 32) * 5) / 9);
}

let fahrenheit = document.querySelector("#fahrenheit-temp");
fahrenheit.addEventListener("click", celusToFahrenheit);
let celcius = document.querySelector("#celcius-temp");
celcius.addEventListener("click", fahrenheitToCelsius);

//Load screen
let apiKey = "5f7905da385tefb6942o90bcb57f0ab1";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);