// day time
let currentDate = new Date();
let realDate = document.querySelector("#Day-Date");
realDate.innerHTML = `${currentDate}`;
console.log("date", realDate);

//display Weather Info

function currentWeather(response) {
  console.log(response.data.main.temp);
  let tempActual = document.querySelector("#Main-Temp");
  let temp = Math.round(response.data.main.temp);
  tempActual.innerHTML = `${temp}°C`;
  let h1 = document.querySelector("#City-Search");
  h1.innerHTML = response.data.name;
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
  let key = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(currentWeather);
}

//Current location

function searchLocation(position) {
  let key = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${key}`;
  console.log(position.coords.latitude, position.coords.longitude);
  console.log(position);

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
