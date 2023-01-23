console.log('hello');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
let hourlyForecastEl = document.querySelector('.hourly-forecast');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hour = time.getHours();
    const HourIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minute = time.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    
    timeEl.innerHTML = (HourIn12HrFormat < 10 ? "0" + HourIn12HrFormat : HourIn12HrFormat) + ":" + (minute < 10 ? "0" + minute : minute) + 
    " " + `<span id="am-pm">${ampm}</span>`;

    dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

const getWeatherData =  ()=>{
    navigator.geolocation.getCurrentPosition(async (success)=>{
        console.log(success);
        let {latitude, longitude} = success.coords;
        console.log(latitude, longitude);

        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=8890dff122339fa3d3712c2559dc1f6f
`)
        const data = await response.json();
        console.log(data);
        showWhetherData(data);

        const responseForHourly = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily,minutely&units=metric&appid=6e2063591e0fcbed66fc99e142be55ab`)
        const dataForHourly = await responseForHourly.json();
        showHourData(dataForHourly);
    })
}


getWeatherData();
const showWhetherData = (data)=>{
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current; //destructing of an object...
    console.log(wind_speed);

    // DOM manipulate
    timezone.innerHTML = `<div class="time-zone" id="time-zone">${data.timezone}</div>`;
    countryEl.innerHTML = `<div class="country" id="country">${data.lat}N&nbsp;&nbsp;&nbsp;${data.lon}E </div>`

    currentWeatherItemsEl.innerHTML = `
        <div class="weather-item">
            <div>Humidity</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-item">
            <div>Pressure</div>
            <div>${pressure}</div>
        </div>
        <div class="weather-item">
            <div>Wind Speed</div>
            <div>${wind_speed}</div>
        </div>
        <div class="weather-item">
            <div>Sunrise</div>
            <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-item">
            <div>Sunset</div>
            <div>${window.moment(sunset*1000).format('HH:mm a')}</div>  
        </div>`;

        let otherDayForecast = "";
        data.daily.forEach((element, index) => {
            if (index === 0) {
                currentTempEl.innerHTML = 
                `<img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="">
                <div class="other">
                    <div class="day">${window.moment(element.dt*1000).format('ddd')}</div>
                    <div class="temp">Night - ${element.temp.night}&#176; C</div>
                    <div class="temp">Day - ${element.temp.day}&#176; C</div>
                </div>`;
            }
            else{
                otherDayForecast += ` 
            <div class="weather-forecast-items">
                <div class="day">${window.moment(element.dt*1000).format('ddd')}</div>
                <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="">
                <div class="temp">Night - ${element.temp.night}&#176; C</div>
                <div class="temp">Day - ${element.temp.day}&#176; C</div>
            </div>
            `;
            }
        });
        weatherForecastEl.innerHTML = otherDayForecast;
}

const showHourData = (data)=>{
    console.log(data);
    let hourDetails = "";
    data.hourly.forEach((element, index)=>{
        if (index <= 12) {

            hourDetails += 
        `
        <div class="after-hour">
            <div class="time">${window.moment(element.dt*1000).format('LT')}</div>
            <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="">
            <div class="temperature">${element.temp}&#176; C</div>
            <div class="description">${element.weather[0].description}</div>
        </div>

        `;
        }
    });
    hourlyForecastEl.innerHTML = hourDetails;
}
