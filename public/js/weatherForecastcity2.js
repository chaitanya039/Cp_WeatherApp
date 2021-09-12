console.log("hello world");

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
            // submitBtn.innerHTML = `
            //         <span class="spinner-border spinner-border-md" role="status" aria-hidden="true"></span>
            //         Loading...`;
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=6e2063591e0fcbed66fc99e142be55ab`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const latitude = data.coord.lat;
            const longitude = data.coord.lon;
            // countryEl.innerHTML = `<div class="country" id="country"><span style="padding: 0.5rem; border: 0.5px solid white; border-radius:0.5rem;box-shadow: -2px 2px 3px -0.5px white;">${data.name}, ${data.sys.country}</span>&nbsp;&nbsp;${data.coord.lat}N&nbsp;&nbsp;&nbsp;${data.coord.lon}E </div>`

            await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=6e2063591e0fcbed66fc99e142be55ab`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // showWhetherData(data);
                })

            await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily&units=metric&appid=6e2063591e0fcbed66fc99e142be55ab`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // showHourData(data);
                });

            // display_container.style.display = "block";
            // search_container.style.display = "none";

            // if ((display_container.style.display = 'block') && (search_container.style.display = "none")) {
            //     submitBtn.innerHTML = `Search <i class="fa fa-search" style="margin-left: 0.5rem; font-size:2rem;"></i>`;
            // }

            // const ref = document.getElementById('ref');
            // ref.addEventListener("click", () => {
            //     window.location.reload();
            // })
        }

        catch (error) {
            console.error(error);
            // display_container.style.display = "none";
            // search_container.style.display = "block";
            // submitBtn.innerHTML = `Search <i class="fa fa-search" style="margin-left: 0.5rem; font-size:2rem;"></i> `;
            // alert("Please, Enter proper name of the city...");
        }

    }
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getWeatherData();
});