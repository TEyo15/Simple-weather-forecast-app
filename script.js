// Get references to HTML elements
const locationInput = document.getElementById("location");
const searchBtn = document.getElementById("searchBtn");
const locationName = document.getElementById("locationName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherDescription = document.getElementById("weatherDescription");

// API key (replace with your own API key)
const apiKey = "2631db917ddd407694c131734231209";

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const location = locationInput.value;
    
    if (location) {
        fetchWeatherData(location);
    } else {
        alert("Please enter a location.");
    }
});

// Function to fetch weather data from the API
function fetchWeatherData(location) {
    const apiUrl = `http://api.weatherapi.com/v1/sports.json?key=2631db917ddd407694c131734231209&q=Lagos`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then((data) => {
            // Check if the API response contains an error message
            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            // Extract relevant weather information
            const location = `${data.name}, ${data.sys.country}`;
            const temperature = `${data.main.temp}°C`;
            const humidity = `${data.main.humidity}%`;
            const windSpeed = `${data.wind.speed} m/s`;
            const weatherDescription = data.weather[0].description;

            // Update the UI with weather data
            locationName.textContent = location;
            temperature.textContent = temperature;
            humidity.textContent = humidity;
            windSpeed.textContent = windSpeed;
            weatherDescription.textContent = weatherDescription;

            // Clear any previous error messages
            clearErrorMessage();
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            displayErrorMessage("Error fetching weather data. Please try again later.");
        });
}

// Function to display error messages to the user
function displayErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

// Function to clear error messages
function clearErrorMessage() {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
}



