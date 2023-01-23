console.log("hello world");
const submitBtn = document.getElementById('submitBtn');
const search_container = document.getElementById('search-container');
const display_container = document.getElementById('display-container');
const cityName = document.getElementById('cityName');
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

    dateEl.innerHTML = `${days[day]}, ${date} ${months[month]}`;
}, 1000);

const showWhetherData = (data) => {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current; //destructing of an object...
    console.log(wind_speed);

    // DOM manipulate
    timezone.innerHTML = `<div class="time-zone" id="time-zone">${data.timezone}</div>`;

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
            <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-item">
            <div>Sunset</div>
            <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>  
        </div>`;

    let otherDayForecast = "";
    data.daily.forEach((element, index) => {
        if (index === 0) {
            currentTempEl.innerHTML =
                `<img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="">
                <div class="other">
                    <div class="day">${window.moment(element.dt * 1000).format('ddd')}</div>
                    <div class="temp">Night - ${element.temp.night}&#176; C</div>
                    <div class="temp">Day - ${element.temp.day}&#176; C</div>
                </div>`;
        }
        else {
            otherDayForecast += ` 
            <div class="weather-forecast-items">
                <div class="day">${window.moment(element.dt * 1000).format('ddd')}</div>
                <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="">
                <div class="temp">Night - ${element.temp.night}&#176; C</div>
                <div class="temp">Day - ${element.temp.day}&#176; C</div>
            </div>
            `;
        }
    });
    weatherForecastEl.innerHTML = otherDayForecast;
}

const showHourData = (data) => {
    console.log(data);
    let hourDetails = "";
    data.hourly.forEach((element, index) => {
        if (index <= 12) {

            hourDetails +=
                `
        <div class="after-hour">
            <div class="time">${window.moment(element.dt * 1000).format('LT')}</div>
            <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="">
            <div class="temperature">${element.temp}&#176; C</div>
            <div class="description">${element.weather[0].description}</div>
        </div>

        `;
        }
    });
    hourlyForecastEl.innerHTML = hourDetails;
}


const getWeatherData = async () => {
    const cityVal = cityName.value;
    if (cityVal === "") {
        alert("Please, Enter city name before Search...");
        display_container.style.display = "none";
        search_container.style.display = "block";
    }

    else {
        try {

            submitBtn.innerHTML = `
                    <span class="spinner-border spinner-border-md" role="status" aria-hidden="true"></span>
                    Loading...`;

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=8890dff122339fa3d3712c2559dc1f6f`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const latitude = data.coord.lat;
            const longitude = data.coord.lon;
            countryEl.innerHTML = `<div class="country" id="country"><span style="padding: 0.5rem; border: 0.5px solid white; border-radius:0.5rem;box-shadow: -2px 2px 3px -0.5px white;">${data.name}, ${data.sys.country}</span>&nbsp;&nbsp;${data.coord.lat}N&nbsp;&nbsp;&nbsp;${data.coord.lon}E </div>`

           const responseForDailyForecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=8890dff122339fa3d3712c2559dc1f6f`)
           const dataForDailyForecast = await responseForDailyForecast.json();
           console.log(dataForDailyForecast);
           showWhetherData(dataForDailyForecast); // show weather data included with current weather as well forecast for daily

            const responseForHourlyForecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily,minutely&units=metric&appid=8890dff122339fa3d3712c2559dc1f6f`)
            const dataForHourlyForecast = await responseForHourlyForecast.json();
            console.log(dataForHourlyForecast);
            showHourData(dataForHourlyForecast); // for hpurly forecast

            display_container.style.display = "block";
            search_container.style.display = "none";

            if ((display_container.style.display = 'block') && (search_container.style.display = "none")) {
                submitBtn.innerHTML = `Search <i class="fa fa-search" style="margin-left: 0.5rem; font-size:2rem;"></i>`;
            };

            const ref = document.getElementById('ref');
            ref.addEventListener("click", () => {
                window.location.reload();
            });
        }

        catch (error) {
            console.error(error);
            display_container.style.display = "none";
            search_container.style.display = "block";
            submitBtn.innerHTML = `Search <i class="fa fa-search" style="margin-left: 0.5rem; font-size:2rem;"></i> `;
            alert("Please, Enter proper name of the city...");
        }

    }
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getWeatherData();
});