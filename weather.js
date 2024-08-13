const apikey = "db2cbd7e1ae4e0f62e532fe52dbb9e03";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let temp = document.querySelector(".weather h1");
let cityname = document.querySelector(".weather h2");
let humidity = document.querySelector(".left p");
let wind = document.querySelector(".right p ");
let searchbox = document.querySelector("#input");
let searchBtn = document.querySelector("#btn");
let image = document.querySelector(".mainimg");
let weather = document.querySelector(".hide");
let error = document.querySelector(".error");

searchbox.addEventListener("input", () => {
  let value = searchbox.value;
  searchbox.value =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
});

let callfunction = () => {
  checkweather(searchbox.value);
};
searchBtn.addEventListener("click", callfunction);

searchbox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkweather(searchbox.value);
  }
});

async function checkweather(city) {
  let response = await fetch(apiurl + city + `&appid=${apikey}`);
  if (response.status == 404 || response.status == 400) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    error.style.display = "none";
    weather.style.display = "block";
    let data = await response.json();
    console.log(data);

    temp.innerHTML = Math.round(data.main.temp) + " °C";
    cityname.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + " % Humidity";
    wind.innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Mist") {
      image.src = "./images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      image.src = "./images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      image.src = "./images/drizzle.png";
    } else if (data.weather[0].main == "Clear") {
      image.src = "./images/clear.png";
    } else if (data.weather[0].main == "Clouds") {
      image.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Snow") {
      image.src = "./images/snow.png";
    } else if (data.weather[0].main == "Haze") {
      image.src = "./images/haze.png";
    }
  }
}
