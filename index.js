const time_data = document.getElementById("time");
const date_data = document.getElementById("date");
const currentWeatherItems = document.getElementById("current_weather_data");
const loc = document.getElementById("loc");
const country_data = document.getElementById("country");
const aqi_data=document.getElementById("aqi");
let aqi;

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const aqis = ["what! really","Good","Fair","Moderate","Poor","Very Poor"];

const API_KEY = "f68ab141beada1ae2477e32a1215699e";

setInterval(function () {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    time_data.innerHTML = (hour < 10 ? "0" + hour : hour) + " : " + (minutes < 10 ? "0" + minutes : minutes) + `<span id="AM-PM"> ${ampm}</span>`;
    date_data.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000)


function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;//this is object destructuring 
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                aqi=data.list[0].main.aqi;
                console.log(aqi);
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=1&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                showData(data);
            })
            });
        
    })
}

function showData(data) {
    let { humidity, pressure, temp } = data.list[0].main;
    let { visibility } = data.list[0];
    let { speed } = data.list[0].wind;
    let { name, country, sunrise, sunset} = data.city;
    let { description, icon } = data.list[0].weather[0];

    loc.innerHTML=name;
    country_data.innerHTML=country
    currentWeatherItems.innerHTML = `
    <div class="image_section">
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="current weather image">
    <div><strong>${description}</strong></div>
    <div id="aqi"><strong>Aqi</strong> 
    <div>${aqi}-${aqis[aqi]}</div>
    </div>
    </div>
    <section class="data_rapi">
    <div class="data_item">
        <div ><strong>Temperature</strong></div>
        <div>${temp}&#176C</div>
    </div>
    <div class="data_item">
        <div ><strong>Humidity</strong></div>
        <div>${humidity}</div>
    </div>
    <div class="data_item">
        <div><strong>Visibility</strong></div>
        <div>${visibility}</div>
    </div><div class="data_item">
        <div><strong>Wind Speed</strong></div>
        <div>${speed}</div>
    </div><div class="data_item">
        <div><strong>Pressure</strong></div>
        <div>${pressure}</div>
    </div>
    <div class="data_item">
        <div><strong>Sunrise</strong></div>
        <div>${window.moment(sunrise*1000).format("HH:MM a")}</div>
    </div>
    <div class="data_item">
        <div><strong>Sunset</strong></div>
        <div>${window.moment(sunset*1000).format("HH:MM a")}</div>
    </div>`
}

getWeatherData();