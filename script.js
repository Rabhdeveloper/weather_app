// document.addEventListener('DOMContentLoaded', function() {
//     const locationInput = document.getElementById('location-input');
//     const searchBtn = document.getElementById('search-btn');
//     const locationElement = document.getElementById('location');
//     const dateElement = document.getElementById('date');
//     const tempElement = document.getElementById('temp');
//     const conditionElement = document.getElementById('condition');
//     const weatherIcon = document.getElementById('weather-icon');
//     const windElement = document.getElementById('wind');
//     const humidityElement = document.getElementById('humidity');
//     const pressureElement = document.getElementById('pressure');
//     const errorMessage = document.getElementById('error-message');
    
//     // API key and base URL
//     const apiKey = 'e0e0bad5d7eb4a54afa182250250208';
//     const baseUrl = 'http://api.weatherapi.com/v1/current.json';
    
//     // Fetch weather data
//     async function fetchWeather(location) {
//         try {
//             const response = await fetch(`${baseUrl}?key=${apiKey}&q=${location}&aqi=yes`);
            
//             if (!response.ok) {
//                 throw new Error('Location not found');
//             }
            
//             const data = await response.json();
//             displayWeather(data);
//             errorMessage.style.display = 'none';
//         } catch (err) {
//             errorMessage.textContent = err.message;
//             errorMessage.style.display = 'block';
//             console.error('Error fetching weather data:', err);
//         }
//     }
    
//     // Display weather data
//     function displayWeather(data) {
//         const { location, current } = data;
        
//         // Location and date
//         locationElement.textContent = `${location.name}, ${location.country}`;
//         dateElement.textContent = new Date(location.localtime).toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
        
//         // Temperature and condition
//         tempElement.textContent = Math.round(current.temp_c);
//         conditionElement.textContent = current.condition.text;
        
//         // Weather icon
//         weatherIcon.src = current.condition.icon;
//         weatherIcon.alt = current.condition.text;
        
//         // Additional details
//         windElement.textContent = `${current.wind_kph} km/h`;
//         humidityElement.textContent = `${current.humidity}%`;
//         pressureElement.textContent = `${current.pressure_mb} hPa`;
//     }
    
//     // Event listeners
//     searchBtn.addEventListener('click', () => {
//         const location = locationInput.value.trim();
//         if (location) {
//             fetchWeather(location);
//         }
//     });
    
//     locationInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             const location = locationInput.value.trim();
//             if (location) {
//                 fetchWeather(location);
//             }
//         }
//     });
    
//     // Fetch default location (India) on page load
//     fetchWeather('India');
// });