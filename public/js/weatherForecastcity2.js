console.log("hello world");
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
            // const latitude = data.coord.lat;
            // const longitude = data.coord.lon;
            // countryEl.innerHTML = `<div class="country" id="country"><span style="padding: 0.5rem; border: 0.5px solid white; border-radius:0.5rem;box-shadow: -2px 2px 3px -0.5px white;">${data.name}, ${data.sys.country}</span>&nbsp;&nbsp;${data.coord.lat}N&nbsp;&nbsp;&nbsp;${data.coord.lon}E </div>`

            // await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=6e2063591e0fcbed66fc99e142be55ab`)
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log(data);
            //         showWhetherData(data);
            //     })

            // await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily&units=metric&appid=6e2063591e0fcbed66fc99e142be55ab`)
            //     .then(response => response.json())
            //     .then(data => {
            //         showHourData(data);
            //     });

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
})