console.log("hello world");
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=6e2063591e0fcbed66fc99e142be55ab`;
    const response =  fetch(url);
    const data =  response.json();
    console.log(data);
})