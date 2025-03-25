document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherOutput = document.getElementById('weather-output');
    const forecastContainer = document.getElementById('forecast');
    
    // Replace with your actual API key from OpenWeatherMap
    const API_KEY = 'your_api_key_here';
    
    searchBtn.addEventListener('click', fetchWeather);
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            fetchWeather();
        }
    });
    
    function fetchWeather() {
        const city = cityInput.value.trim();
        
        if (!city) {
            showError('Please enter a city name');
            return;
        }
        
        showLoading(true);
        
        // Fetch current weather
        fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayCurrentWeather(data);
                // Fetch forecast data
                return fetch(https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Forecast data not available');
                }
                return response.json();
            })
            .then(data => {
                displayForecast(data);
                showLoading(false);
            })
            .catch(error => {
                showError(error.message);
                showLoading(false);
            });
    }
    
    function displayCurrentWeather(data) {
        const cityName = document.getElementById('city-name');
        const temperature = document.getElementById('temperature');
        const weatherDesc = document.getElementById('weather-description');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('wind-speed');
        const weatherIcon = weatherOutput.querySelector('.weather-icon i');
        
        cityName.textContent = ${data.name}, ${data.sys.country};
        temperature.textContent = `${Math.round(data.main.temp)}°
