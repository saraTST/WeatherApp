// day time
let currentDate = new Date();
let realDate = document.querySelector("#Day-Date");
realDate.innerHTML = `${currentDate}`;
console.log("date", realDate);

//date time and hour for search

//function formatDate(timestamp) {
//let dateSearch = new Date(timestamp);
//let hoursSearch = dateSearch.getHours();
//if (hoursSearch < 10) {
//hours = `0${hoursSearch}`;
//}
//let minutesSearch = dateSearch.getMinutes();
//if (minutesSearch < 10) {
//minutesSearch = `0${minutesSearch}`;
//}
//let daysSearch = [
//"Sunday",
//"Monday",
//"Tuesday",
//"Wednesday",
//"Thursday",
//"Friday",
//"Saturday",
//];
//let daySearch = daysSearch[dateSearc.getDay()];
//return `${daySearch} ${hoursSearch} ${minutesSearch}`;
//}

//forecast info
function displayForecast(response) {
  console.log("forecast daily", response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  //forecastElement.innerHTML = "SARA";

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
  <div class="weather-forecast-date">${day}</div>
  <img
  src="http://openweathermap.org/img/wn/50d@2x.png"
  alt=""
  width="42"
  />
  <div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max"> 18° </span>
  <span class="weather-forecast-temperature-min"> 12° </span>
  </div>
  </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log("Forecast Functions", coordinates);
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
  console.log(apiURL);
}

//display Weather Info

function currentWeather(response) {
  console.log(response.data);
  let tempActual = document.querySelector("#Main-Temp");
  //OPENWEATHER
  let temp = Math.round(response.data.main.temp);
  //SHECODESAPI let temp = Math.round(response.data.temperature.current);
  let descriptionActual = document.querySelector("#Description-Day");
  let humidityElement = document.querySelector("#Humidity");
  let feelsElement = document.querySelector("#FeelsLike");
  let windElement = document.querySelector("#WindSpeed");
  // OPENWEATHER let windValue = Math.round(response.data.wind.speed);
  //SHECODESAPI let windValue = Math.round(response.data.wind.speed);
  //let dateElement = document.querySelector("#Search-Time");
  let iconElement = document.querySelector("#Main-Icon");

  tempActual.innerHTML = `${temp}°C`;
  let h1 = document.querySelector("#City-Search");
  //OPENWEATHER
  h1.innerHTML = response.data.name;
  //SHECODESAPI h1.innerHTML = response.data.city;
  //OPENWEATHER
  descriptionActual.innerHTML = response.data.weather[0].description;
  //SHECODESAPI descriptionActual.innerHTML = response.data.condition.description;
  //SHECODESAPI console.log(response.data.condition.description);
  //OPENWEATHER
  console.log(response.data.weather[0].description);
  //OPENWEATHER
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  console.log(response.data.main.humidity);
  //SHECODESAPI humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  //SHECODESAPI windElement.innerHTML = `${windValue}km/hr`;
  //OPENWEATHER
  feelsElement.innerHTML = `${response.data.main.feels_like} °C`;
  //SHECODESAPI feelsElement.innerHTML = `${response.data.temperature.feels_like}°C`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/hr`;
  //dateElement.innerHTML = formatDate(response.data.dt * 1000);
  //console.log(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(response.data.weather[0].icon);

  getForecast(response.data.coord);
}

//city search

function searchCity(event) {
  event.preventDefault();

  let city = document.querySelector("#Input-City").value;
  console.log("Ciudad que estan buscando", city);
  search(city);

  let h1 = document.querySelector("#City-Search");
  h1.innerHTML = city;
  console.log("Valord de H1", h1);

  let currentDate = new Date();
  let realDate = document.querySelector("#Day-Date");
  realDate.innerHTML = `${currentDate}`;
}

let form = document.querySelector("#City-Form");
form.addEventListener("submit", searchCity);

function search(city) {
  //openwatherAPI
  let key = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  //sheCodes API
  //let key = "a6bab70ec52a43963e142ab80toaf081";
  //let unit = "metric";
  //let apiUrl = `https://api.shecodes.io/weather/v1/current?query={city}&key=a6bab70ec52a43963e142ab80toaf081&units=metric`;
  //`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}
//displayForecast();

//Current location

function searchLocation(position) {
  //openWeather API
  let key = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${key}`;
  //`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${key}`;
  console.log(position.coords.latitude, position.coords.longitude);
  console.log(position);

  //sheCodesAPI
  //let key = "a6bab70ec52a43963e142ab80toaf081";
  //let url = `https://api.shecodes.io/weather/v1/forecast?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=a6bab70ec52a43963e142ab80toaf081&units=metric`;
  //console.log(position.coords.longitude, position.coords.latitude);
  //console.log(position);

  axios.get(url).then(currentWeather);
}

function showLocationTemp(event) {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Celcius and Fahrenheit
//cityTemp
//function showTemp(response) {
//let city = "paris";
//let key = "c8a77112b2faf6684bb4b21a0aa778ae";
//let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
//let temperature = Math.round(response.data.main.temp);
//let temperatureReal = document.querySelector("#Main-Temp");
//temperatureReal.innerHTML = `${temperature}ºC`;
//console.log(response.data.main.temp);
//}
//axios.get(apiURL).then(showTemp);

//convert to fahrenheit
//function convertFahrenheit(event) {
//event.preventDefault();
//let h2 = document.querySelector("#Main-Temp");
//h2.innerHTML = "86F";
//console.log("TempFaharenheit", h2);
//}
//let buttonFahrenheit = document.querySelector("#fahrenheit-button");
//buttonFahrenheit.addEventListener("click", convertFahrenheit);

//convert to celsius
//function convertCelsius(event) {
//event.preventDefault();
//let h2 = document.querySelector("#Main-Temp");
//h2.innerHTML = "30°";
//console.log("TempCelsius", h2);
//}
//let buttonCelsius = document.querySelector("#celsius-button");
//buttonCelsius.addEventListener("click", convertCelsius);
