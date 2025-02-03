import "./styles.css";

function displayData(data) {
  if (!data) {
    alert("No data to display.");
    return;
  }
  const location = document.querySelector(".location");
  const condition = document.querySelector(".condition");
  const humidity = document.querySelector(".humidity");
  const temperature = document.querySelector(".temperature");

  if (location) location.innerHTML = `<p>Location: <span class="data">${data.location}</span></p>`;
  if (condition) condition.innerHTML = `<p>Condition: <span class="data">${data.condition}</span></p>`;
  if (humidity) humidity.innerHTML = `<p>Humidity: <span class="data">${data.humidity}</span></p>`;
  if (temperature) temperature.innerHTML = `<p>Temperature: <span class="data">${data.temperature}</span></p>`;
}

function processData(data) {
  if (!data || !data.currentConditions) {
    console.error("Invalid weather data received:", data);
    return null;
  }

  const WeatherInfo = {
    location: data.resolvedAddress,
    condition: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity,
    temperature: data.currentConditions.temp,
  };
  return WeatherInfo;
}

async function getWeather(place) {
  try {
    const promise = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&key=27S3NBCL43ZUN2YVMEX8MGJUS&contentType=json`,
      { mode: "cors" },
    );

    if (!promise.ok) {
      throw new Error(`HTTP error! status: ${promise.status}`);
    }

    const locationData = await promise.json();
    console.log(locationData);
    return processData(locationData);
  } catch (err) {
    console.error(`Error: ${err}`);
    return null;
  }
}
const input = document.getElementById("city");

async function showWeather() {
  const weatherData = await getWeather(input.value);
  displayData(weatherData);
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  if (!input.value) {
    alert("Enter a city");
    return;
  }
  e.preventDefault();
  showWeather();
  input.value = "";
});
