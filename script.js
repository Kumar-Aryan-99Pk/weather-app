
async function getWeather(){
    const response=await fetch('https://api.watherapi.com/v1/forecast.json?key=e132970dc5b042afafc55826260402&q=New York&days=5&aqi=yes&alerts=no');
    const data= await response.json();
    console.log(data);
    renderLocation(data);
    
}

function renderLocation(data){
    const date=document.querySelector('.date');
    const time=document.querySelector('.time');
    const city=document.querySelector('.city');
    const geography=document.querySelector('.geography');
    date.textContent=data.location.localtime.slice(0,10);
    time.textContent=data.location.localtime.slice(11);
    city.textContent=data.location.name;
    geography.textContent=data.location.region+'/'+data.location.country;
}

function renderCurrentTemperature(data){
    const currtemp=document.querySelector('.curr-temp');
    const currcondition=document.querySelector('.curr-condition');
    
}
<div class="curr-temp">28°C</div>
            <div class="curr-condition">
                Cloudy
            <div class="condition-logo"></div>
getWeather();



