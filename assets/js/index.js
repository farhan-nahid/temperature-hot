// HTML elements

const weatherSearchInput = document.getElementById("weather__search__input");
const weatherSearchButton = document.getElementById("weather__search__button");
const spinner = document.getElementById("loading__spinner");
const weatherDetails = document.getElementById("watcher__details");
spinner.style.display = "none";
weatherDetails.style.display = "none";

// get input values

weatherSearchButton.addEventListener("click", () => {
  const cityName = weatherSearchInput.value;
  spinner.style.display = "block";
  const apiKey = "8e0f94fc32216b36c7c2392d69cf2d72";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then((res) => res.json())
    .then((city) => {
      spinner.style.display = "none";
      displayCity(city);
    })
    .catch((err) => alert(err));

  weatherSearchInput.value = "";
});

// display the results

const displayCity = (city) => {
  const { name, weather, main, wind, sys } = city;
  if (city.cod === "404") {
    alert(`${city.message}`);
    return false;
  } else {
    weatherDetails.style.display = "block";
    weatherDetails.textContent = "";
    weatherDetails.innerHTML = `
            <img src='https://openweathermap.org/img/wn/${weather[0].icon}@2x.png' alt="${name}" />
            <h1>City: ${name}</h1>
            <h4>${weather[0].main}</h4>
            <h3>${main.temp}&deg;C</h3>
            <h2>Wind Speed: ${wind.speed}</h2>
            <h5>Country: ${sys.country}</h5>
      `;
  }
};
