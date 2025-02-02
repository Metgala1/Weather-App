import "./styles.css";

const input = document.getElementById("city").value;

function displayData(data) {
    if (!data) {
        console.error("No data to display.");
        return;
    }
    const location = document.querySelector(".location");
    const condition = document.querySelector(".condition");
    const humidity = document.querySelector(".humidity");
    const temperature = document.querySelector(".temperature");

    if (location) location.textContent = data.location;
    if (condition) condition.textContent = data.condition;
    if (humidity) humidity.textContent = data.humidity;
    if (temperature) temperature.textContent = data.temperature;
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

async function showWeather(place) {
    const weatherData = await getWeather(place);
    displayData(weatherData);
}

showWeather();
