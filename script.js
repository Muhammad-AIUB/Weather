const apiKey = "2a4031915c23ec6fbc2020b92686320e"; // Replace with your API key
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.getElementById("searchBtn");
const locationInput = document.getElementById("locationInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.querySelector(".weather-icon i");

searchBtn.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  } else {
    alert("Please enter a city name");
  }
});

async function fetchWeather(location) {
  const url = `${apiUrl}${location}&appid=${apiKey}`;
  console.log("Request URL:", url); // Debugging: Log the request URL

  try {
    const response = await fetch(url);
    console.log("Response Status:", response.status); // Debugging: Log the response status

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Debugging: Log the API response

    if (data.cod === 200) {
      displayWeather(data);
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Error fetching weather data. Please try again.");
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;

  // Update the DOM with weather data
  cityName.textContent = name;
  temperature.textContent = `${Math.round(main.temp)}°C`;
  weatherDescription.textContent = weather[0].description;
  humidity.textContent = `${main.humidity}%`;
  windSpeed.textContent = `${wind.speed} km/h`;

  // Update the weather icon
  const iconClass = getWeatherIconClass(weather[0].icon);
  weatherIcon.className = `wi ${iconClass}`;
}

// Function to map OpenWeatherMap icon codes to Weather Icons classes
function getWeatherIconClass(iconCode) {
  const iconMap = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-cloudy",
    "02n": "wi-night-cloudy",
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-showers",
    "09n": "wi-showers",
    "10d": "wi-day-rain",
    "10n": "wi-night-rain",
    "11d": "wi-thunderstorm",
    "11n": "wi-thunderstorm",
    "13d": "wi-snow",
    "13n": "wi-snow",
    "50d": "wi-fog",
    "50n": "wi-fog",
  };
  return iconMap[iconCode] || "wi-day-sunny"; // Default to sunny if no match
}
