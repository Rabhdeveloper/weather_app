document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const locationInput = document.getElementById('location-input');
    const searchBtn = document.getElementById('search-btn');
    const locationElement = document.getElementById('location');
    const dateElement = document.getElementById('date');
    const tempElement = document.getElementById('temp');
    const conditionElement = document.getElementById('condition');
    const weatherIcon = document.getElementById('weather-icon');
    const windElement = document.getElementById('wind');
    const humidityElement = document.getElementById('humidity');
    const pressureElement = document.getElementById('pressure');
    const visibilityElement = document.getElementById('visibility');
    const aqiElement = document.getElementById('aqi');
    const errorMessage = document.getElementById('error-message');
    const loadingElement = document.getElementById('loading');
    const weatherContent = document.getElementById('weather-content');
    const forecastContainer = document.getElementById('forecast-container');
    const hourlyForecastContainer = document.getElementById('hourly-forecast');
    const lastUpdatedElement = document.getElementById('last-updated');
    
    // API Configuration
    const apiKey = 'e0e0bad5d7eb4a54afa182250250208';
    const baseUrl = 'https://api.weatherapi.com/v1';
    
    // Fetch weather data
    async function fetchWeather(location) {
        try {
            showLoading();
            
            const response = await fetch(`${baseUrl}/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`);
            
            if (!response.ok) {
                throw new Error('Location not found. Please try another city or country.');
            }
            
            const data = await response.json();
            displayWeather(data);
            hideError();
            
            // For demonstration purposes, generate forecast data
            generateForecastData(data);
            generateHourlyData();
            
        } catch (err) {
            showError(err.message);
            console.error('Error fetching weather data:', err);
        } finally {
            hideLoading();
        }
    }
    
    // Display weather data
    function displayWeather(data) {
        const { location, current } = data;
        
        // Location and date
        locationElement.textContent = `${location.name}, ${location.country}`;
        dateElement.textContent = new Date(location.localtime).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        lastUpdatedElement.textContent = `Updated: ${new Date().toLocaleTimeString()}`;
        
        // Temperature and condition
        tempElement.textContent = Math.round(current.temp_c);
        conditionElement.textContent = current.condition.text;
        
        // Weather icon
        weatherIcon.src = current.condition.icon;
        weatherIcon.alt = current.condition.text;
        
        // Additional details
        windElement.textContent = `${current.wind_kph} km/h`;
        humidityElement.textContent = `${current.humidity}%`;
        pressureElement.textContent = `${current.pressure_mb} hPa`;
        visibilityElement.textContent = `${current.vis_km} km`;
        
        // Air quality
        if (current.air_quality && current.air_quality['us-epa-index']) {
            const aqi = current.air_quality['us-epa-index'];
            aqiElement.textContent = `${aqi} (${getAQIDescription(aqi)})`;
        } else {
            aqiElement.textContent = 'N/A';
        }
        
        weatherContent.style.display = 'block';
    }
    
    // Generate forecast data (for demonstration)
    function generateForecastData(currentData) {
        forecastContainer.innerHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            
            // Randomize temperature for demo (within ±5 degrees of current temp)
            const tempVariation = (Math.random() * 10) - 5;
            const forecastTemp = Math.round(Number(currentData.current.temp_c) + tempVariation);
            
            // Conditions for demo
            const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy'];
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            
            forecastCard.innerHTML = `
                <div class="forecast-date">${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div class="forecast-date">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <img src="${currentData.current.condition.icon}" class="forecast-icon" alt="${condition}">
                <div class="forecast-temp">${forecastTemp}°C</div>
                <div class="forecast-condition">${condition}</div>
            `;
            
            forecastContainer.appendChild(forecastCard);
        }
    }
    
    // Generate hourly data (for demonstration)
    function generateHourlyData() {
        hourlyForecastContainer.innerHTML = '';
        
        const now = new Date();
        
        for (let i = 0; i < 12; i++) {
            const hour = new Date(now.getTime());
            hour.setHours(now.getHours() + i);
            
            const hourlyItem = document.createElement('div');
            hourlyItem.className = 'hourly-item';
            
            // Randomize temperature for demo
            const tempVariation = (Math.random() * 4) - 2;
            const hourlyTemp = Math.round(Number(tempElement.textContent) + tempVariation);
            
            hourlyItem.innerHTML = `
                <div class="hourly-time">${hour.toLocaleTimeString('en-US', { hour: 'numeric' })}</div>
                <img src="${weatherIcon.src}" class="hourly-icon" alt="Weather">
                <div class="hourly-temp">${hourlyTemp}°C</div>
            `;
            
            hourlyForecastContainer.appendChild(hourlyItem);
        }
    }
    
    // Helper functions
    function getAQIDescription(aqi) {
        const descriptions = {
            1: 'Good',
            2: 'Moderate',
            3: 'Unhealthy for sensitive groups',
            4: 'Unhealthy',
            5: 'Very Unhealthy',
            6: 'Hazardous'
        };
        return descriptions[aqi] || 'Unknown';
    }
    
    function showLoading() {
        loadingElement.style.display = 'block';
        weatherContent.style.display = 'none';
    }
    
    function hideLoading() {
        loadingElement.style.display = 'none';
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        weatherContent.style.display = 'none';
    }
    
    function hideError() {
        errorMessage.style.display = 'none';
    }
    
    // Event listeners
    searchBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            showError('Please enter a location');
        }
    });
    
    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const location = locationInput.value.trim();
            if (location) {
                fetchWeather(location);
            } else {
                showError('Please enter a location');
            }
        }
    });
    
    // Fetch default location (India) on page load
    fetchWeather('India');
});