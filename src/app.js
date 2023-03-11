//Search Form
function changeCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let locationInput = document.querySelector("#location-input");
  h1.innerHTML = `${locationInput.value}`;
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

//CLOCK
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
    "Dec"
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
//Forecast API 
function getForecast (coordinates) {
console.log(coordinates);
let apiKey = "8161b4309ee03faae957729ba7104797";
let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);

}

//Real Data API
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let realTemp = document.querySelector("#temp");
  realTemp.innerHTML = temperature;
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `It feels like ${Math.round(
    response.data.main.feels_like
  )}°`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humid = document.querySelector("#humid");
  humid.innerHTML = `Humidity is ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind is ${Math.round(response.data.wind.speed)} mph`;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description )

  getForecast (response.data.coord);
}

//Forecast
function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tues", "Wed", "Thurs"];
  
  days.forEach(function(day){
    forecastHTML = forecastHTML + 
    `   
      <div class="col-2">
          <div class="weather-forecast-date">
           ${day}
          </div>
            <img src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/069/360/original/cloud.jpg?1677539382" alt="" width="43">
              <div class="weather-forecast-temperature">
              <span class="weather-forecast-maximum"> 
                6°
              </span>
          |
              <span class="weather-forecast-minimum"> 
              3°
              </span>
          </div>
        </div>
    `;
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Current Location Button
function currentPosition(position) {
  navigator.geolocation.getCurrentPosition(currentPosition);
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
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
let apiKey = "8161b4309ee03faae957729ba7104797";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showTemperature);
