const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const apikey = "3265874a2c77ae4a04bb96236a642d2f";

function url(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
}

// data by city :
async function getWeatherBylocation(city) {
  const resp = await fetch(url(city));

  const respData = await resp.json();
  addWeatherToPage(respData);
}

function Fareh_to_Cel(K) {
  return (K - 273.15).toFixed(2);
}

function addWeatherToPage(data) {
  const temp = Fareh_to_Cel(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = ` 
    
    <small>There are </small>
    <h2> ${temp} °C </h2>
    <p> in ${search.value} </p>
    
    `;

  // clearing container
  main.innerHTML = "";
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    getWeatherBylocation(city);
  }
});
