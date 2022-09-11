const time_data=document.getElementById("time");
const date_data=document.getElementById("date");
const currentWeatherItems=document.getElementById("current_weather_data");
const timeZone=document.getElementById("time_zone");
const country=document.getElementById("country");

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
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=1&appid=${API_KEY}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            showData(data);
        });
    })
}

function showData(data){
    let {humidity,pressure,temp}=data.list[0].main;
    let {visibility}=data.list[0];
    let {speed}=data.list[0].wind;
    let {name,country}=data.city;
    let {description,icon}=data.list[0].weather[0];

    currentWeatherItems.innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="current weather image">
    <section class="data_rapi">
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
        <div><strong>pressure</strong></div>
        <div>${pressure}</div>
    </div>`
}

getWeatherData();