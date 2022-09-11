const time_data=document.getElementById("time");
const date_data=document.getElementById("date");
const currentWeatherItems=document.getElementById("current_weather_data");
const timeZone=document.getElementById("time_zone");
const country=document.getElementById("country");
const forecastItem=document.getElementById("forecast_item");
const currentTemp=document.getElementById("today");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY="f68ab141beada1ae2477e32a1215699e";

setInterval(function(){
    const time=new Date();
    const month=time.getMonth();
    const date =time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const minutes=time.getMinutes();
    const ampm=hour>=12?"PM":"AM";
    time_data.innerHTML=(hour<10?"0"+hour:hour) + " : " + (minutes<10?"0"+minutes:minutes) + `<span id="AM-PM"> ${ampm}</span>`;
    date_data.innerHTML=days[day] +", "+ date + " " + months[month];
},1000)


function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        let {latitude,longitude}=success.coords;//this is object destructuring 
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            showData(data);
        });
    })
}

function showData(data){
    let {humidity,pressure,visibility}=data.list[0].main;
    console.log(humidity);
    let {speed}=data.list[0].wind;
    console.log(speed);
}

getWeatherData();