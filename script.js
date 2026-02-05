
async function getWeather(){

    const response=await fetch('https://api.weatherapi.com/v1/forecast.json?key=e132970dc5b042afafc55826260402&q=New York&days=5&aqi=yes&alerts=no');
    const data= await response.json();
    console.log(data);
    renderLocation(data);
    renderCurrentTemperature(data);
    renderCurrentForecast(data);
}

function renderLocation(data){
    const date=document.querySelector('.date');
    const time=document.querySelector('.time');
    const city=document.querySelector('.city');
    const geography=document.querySelector('.geography');
    date.textContent=convertYMDtoWords(data.location.localtime.slice(0,10));
    time.textContent=data.location.localtime.slice(11);
    city.textContent=data.location.name;
    geography.textContent=data.location.region+'/'+data.location.country;
}

function renderCurrentTemperature(data){
    const currtemp=document.querySelector('.curr-temp');
    const currcondition=document.querySelector('.curr-condition');
    const conditionlogo=document.querySelector('.condition-logo');
    
    const feelslike=document.querySelector('.feels-like')
    const wind=document.querySelector('.wind');
    const humidity=document.querySelector('.humidity');

    currtemp.textContent=`${data.current.temp_c}°C`;
    currcondition.textContent=data.current.condition.text;
    conditionlogo.innerHTML = `<img src="${data.current.condition.icon}" alt="weather icon">`;
    feelslike.textContent=`Feels like: ${data.current.feelslike_c}°C`;
    wind.textContent=`Wind speed : ${data.current.wind_mph}`;
    humidity.textContent=`Humidity: ${data.current.humidity}`;
}

// function renderCurrentForecast(data) {
//   const cards = document.querySelectorAll(".today-forecast-card");
//   const hours = data.forecast.forecastday[0].hour;
//   const threeHourForecast = hours.filter((_, index) => index % 3 === 0);

//   cards.forEach((card, i) => {
//     if (!threeHourForecast[i]) return;
//     card.innerHTML='';

//     const forecastconditionlogo=document.createElement("div");
//     const currlogo=document.createElement("img");
//     currlogo.src=threeHourForecast[i].condition.icon;
//     forecastconditionlogo.append(currlogo);
//     card.append(forecastconditionlogo);
//     const forecastTemp = document.createElement("div");
//     forecastTemp.className = "forecast-temp";
//     forecastTemp.textContent =
//       Math.round(threeHourForecast[i].temp_c) + "°C";

//     card.append(forecastTemp);

//     const forecasttime=document.createElement("div");
//     forecasttime.className="forecast-time";
//     forecasttime.textContent=threeHourForecast[i].time.slice(11);
//     card.append(forecasttime);
//   });
// }
function renderCurrentForecast(data) {
    const forecastContainer = document.querySelector(".today-forecast");
    const hours = data.forecast.forecastday[0].hour;
    const threeHourForecast = hours.filter((_, index) => index % 3 === 0);

    // Clear container and map through data to create cards
    forecastContainer.innerHTML = threeHourForecast.map(hour => `
        <div class="today-forecast-card">
            <img src="${hour.condition.icon}" alt="icon">
            <div class="forecast-temp">${Math.round(hour.temp_c)}°C</div>
            <div class="forecast-time">${hour.time.slice(11)}</div>
        </div>
    `).join('');
}

function convertYMDtoWords(dateString) {
    const dateObject = new Date(dateString);

    if (isNaN(dateObject.getTime())) {
        return "Invalid Date";
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options); 
}

getWeather();

