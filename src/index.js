"use strict";

const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");

function updateValues(
  temperatureValue = 0,
  windSpeedValue = 0,
  humidityValue = 0
) {
  temperature.textContent = temperatureValue + " C";
  windSpeed.textContent = windSpeedValue + " m/s";
  humidity.textContent = humidityValue;
}
updateValues();

const citySwitch = document.querySelectorAll('input[name="city-switch"]');
const inputCityName = document.getElementById("city-name");
const inputCityId = document.getElementById("city-id");

citySwitch.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "name") {
      inputCityName.disabled = false;
      inputCityId.disabled = true;
    } else {
      inputCityName.disabled = true;
      inputCityId.disabled = false;
    }
  });
});

const apiKey = "f9bd856f8008bd7e0eea030bdec858ad";
const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const city = document.querySelector('input[type="text"]:not([disabled])');
  const getWeather = `https://api.openweathermap.org/data/2.5/weather?${
    city.name === "city-name" ? "q" : "id"
  }=${city.value}&units=metric&appid=${apiKey}`;
  fetch(getWeather)
    .then((response) => response.json())
    .then((data) => {
      updateValues(data.main.temp, data.wind.speed, data.main.humidity);
    })
    .catch((err) => {
      console.log(err);
    });
});

const resetButton = document.querySelector('button[type="reset"]');
resetButton.addEventListener("click", () => {
  inputCityName.disabled = false;
  inputCityId.disabled = true;
  updateValues();
});
