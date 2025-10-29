const apiKey = "98e9800e03396cd1cef0bd9c83466ccb";

const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const cityInput = document.getElementById("city") as HTMLInputElement;
const weatherDiv = document.getElementById("weather") as HTMLDivElement;

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  weatherDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (data.cod === "404") {
      weatherDiv.innerHTML = "<p>❌ City not found.</p>";
      return;
    }

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDiv.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <img src="${iconUrl}" alt="Weather Icon" class="icon" />
      <p>${data.weather[0].main} - ${data.weather[0].description}</p>
      <p>🌡️ ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = "<p>⚠️ Error fetching weather data.</p>";
  }
});
