

const API_KEY = "1a0d84066185f5b88a5dbd99c2dcaefa"; // Replace with your OpenWeather API key

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cityInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            getWeather();
        }
    });
});

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("❗ Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weather = data.weather[0].main;
                const temp = data.main.temp;
                document.getElementById("weatherResult").innerHTML = `🌡 Temperature: ${temp}°C | Condition: ${weather}`;

                applyScheduling(weather);
            } else {
                document.getElementById("weatherResult").innerHTML = "❌ City not found!";
            }
        })
        .catch(error => {
            console.error("⚠ Error fetching weather data:", error);
            document.getElementById("weatherResult").innerHTML = "⚠ Error fetching data. Please try again!";
        });
}

function applyScheduling(weather) {
    let scheduleText = "📌 Recommended Scheduling: ";

    if (weather === "Clear" || weather === "Sunny") {
        scheduleText += "☀ First Come, First Serve (FCFS)";
    } else if (weather === "Rain" || weather === "Cloudy") {
        scheduleText += "☁ Shortest Job First (SJF)";
    } else {
        scheduleText += "⚡ Round Robin Scheduling";
    }

    document.getElementById("scheduleResult").innerHTML = scheduleText;
}











