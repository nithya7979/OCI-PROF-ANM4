const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

searchButton.addEventListener('click', getWeatherData);

function getWeatherData() {
    const city = cityInput.value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found!');
                return;
            }
            displayWeather(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
