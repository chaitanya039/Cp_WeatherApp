// modules =>
// creating the express module first...
const express = require('express');
const path = require('path');
// for the use of express js partials...
const hbs = require('hbs');
const favicon = require('serve-favicon');

//Create the express application by using the express function...
const app = express();
const port = process.env.PORT || 80;

// public static path
const static_path = path.join(__dirname, "../public");
const favicon_path = path.join(__dirname, "../public", "favicon.png");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// tempalte engine of express
// set the extension of the view engine first
app.set("view engine", 'hbs');

// setting the path of the views directory
app.set('views', template_path);
// setting the path of partials or registered the partials..
hbs.registerPartials(partials_path);

// Serving the ststic files at the back end..
// and express considered the top to bottom manner..
// and then close the server request..
app.use(express.static(static_path));
app.use(favicon(favicon_path));


// routing =>
// Now with the help of this app we can access the all properties and methods of the express module...
// syntax :-
// app.get(route, callback);
app.get("/", (req, res)=>{
    res.render('index.hbs');
});

// for about page
app.get("/about", (req, res)=>{
    res.render('about.hbs');
});

// for information page
app.get("/info", (req, res)=>{
    res.render("info.hbs");
})

// for weather page
app.get("/weather", (req, res)=>{
    res.render("weather.hbs");
});

// for mylocation page
app.get("/mylocation", (req, res)=>{
    res.render("mylocation.hbs");
});

// for weather forecast page
app.get("/weatherforecast", (req, res)=>{
    res.render("weatherforecast.hbs");
});


// for weather forecast of city page
app.get("/weather_forecast_city", (req, res)=>{
    res.render("weatherforecastcity.hbs");
});

// for route page
app.get("/route", (req, res)=>{
    res.render("route.hbs");
});

// for airpollution page
app.get("/airpollution", (req, res)=>{
    res.render("airpollution.hbs");
});

// for sports news page
app.get("/sports", (req, res)=>{
    res.render("news.hbs");
});

// for entertainment news page
app.get("/entertainment", (req, res)=>{
    res.render("news.hbs");
});

// for general news page
app.get("/general", (req, res)=>{
    res.render("news.hbs");
});

// for business news page
app.get("/business", (req, res)=>{
    res.render("news.hbs");
});

// for health news page
app.get("/health", (req, res)=>{
    res.render("news.hbs");
});

// for science news page
app.get("/science", (req, res)=>{
    res.render("news.hbs");
});


// for technology news page
app.get("/technology", (req, res)=>{
    res.render("news.hbs");
});


// undefined page 404 error page
app.get("*", (req, res)=>{
    res.render('404err.hbs', {
        reaction: "😱 Oops!",
        errMsg: "Page Not Found..."
    });
});

// listening the port
app.listen(port, '0.0.0.0', () => {
    console.log(`You are listening at the port ${port}`);
})
