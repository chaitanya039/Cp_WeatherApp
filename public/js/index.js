console.log('welcome to, weather app created by chaitanya pansare');
const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector(".middle_layer");
const maphide = document.getElementById('map');

const getInfo = async (e) => {
    e.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = "Please Enter the name of your city before Search";
        datahide.classList.add("data-hide");
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=6e2063591e0fcbed66fc99e142be55ab`;
            const response = await fetch(url);
            // console.log(response);
            const data = await response.json();
            // console.log(data);
            var arrData = [data];
            // console.log(arrData);
            city_name.innerHTML = `<i class="fa fa-street-view" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            if (tempMood == "Clear") {
                temp_status.innerHTML = `<i class= "fa fa-sun" aria-hidden="true" style = "color:orange;"></i>`
            }
            else if (tempMood == "Clouds") {
                temp_status.innerHTML = `<i class= "fa fa-cloud" aria-hidden="true" style = "color: #ecf0f1;"></i>`
            }
            else if (tempMood == "Rain") {
                temp_status.innerHTML = `<i class= "fa fa-cloud-rain" aria-hidden="true" style = "color: #ecf0f1;"></i>`
            }
            else {
                temp_status.innerHTML = `<i class= "fa fa-cloud" aria-hidden="true" style = "color: #ecf0f1;"></i>`
            }

            //mapbox
            let longitude = arrData[0].coord.lon;
            let latitude = arrData[0].coord.lat;
            let temperature = arrData[0].main.temp;
            console.log(temperature);
            let color = "skyblue";

            if (temperature >= 35 && temperature <= 38)
             {
                //normal
                 color = "green";
            }
            else if(temperature < 35){
                //low
                color = "blue";
            }
            else if(temperature > 38){
              // high
              color = "red";
            }

           

            // Create a Marker of city and add it to the map.
            new mapboxgl.Marker({
                color: color
            })
            .setLngLat([longitude, latitude])
            .addTo(map);

            map.flyTo({
                center: [longitude, latitude],
                zoom:11.5,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
            datahide.classList.remove("data-hide");
        }

        catch (error) {
            console.error(error)
            city_name.innerText = "Please Enter proper name of your city";
            datahide.classList.add("data-hide");
        }
    }
}

submitBtn.addEventListener('click', getInfo);