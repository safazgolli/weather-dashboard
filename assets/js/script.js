let apiKey ="3c25187c22c3811aac76c46a629ee3ce";
let cityName = document.querySelector('#city-input');
let citySearch = document.querySelector('#city-name');
let cityHistory = document.querySelector('#history');
let displayCityWth = document.querySelector('#temp-container');
let displayCityDesc= document.querySelector('#discrip');
let displayWind = document.querySelector('#wind');
let displayHumid = document.querySelector('#humidity');
let button= document.querySelector('#search-button');
let cityIcon = document.querySelector('#icn');
let cityIcon1 = document.querySelector('#icn1');
let cityIcon2 = document.querySelector('#icn2');
let cityIcon3 = document.querySelector('#icn3');
let cityIcon4 = document.querySelector('#icn4');
let cityIcon5 = document.querySelector('#icn5');

let today= moment();

// global variable for day 1 forecast 
var tempDay1 = document.querySelector('#temp1');
var windDay1 = document.querySelector('#wind1');
var HumidDay1 = document.querySelector('#humidity1');
let day1Date = document.querySelector('#date1')

// global variable for day 2 forecast 
var tempDay2 = document.querySelector('#temp2');
var windDay2 = document.querySelector('#wind2');
var HumidDay2 = document.querySelector('#humidity2');
let day2Date = document.querySelector('#date2')
// global variable for day 3 forecast 
var tempDay3 = document.querySelector('#temp3');
var windDay3 = document.querySelector('#wind3');
var HumidDay3 = document.querySelector('#humidity3');
let day3Date = document.querySelector('#date3')
// global variable for day 4 forecast 
let  tempDay4 = document.querySelector('#temp4');
let  windDay4 = document.querySelector('#wind4');
let HumidDay4 = document.querySelector('#humidity4');
let day4Date = document.querySelector('#date4')
// global variable for day 5 forecast 
let tempDay5 = document.querySelector('#temp5');
let windDay5 = document.querySelector('#wind5');
let HumidDay5 = document.querySelector('#humidity5');
let day5Date = document.querySelector('#date5')

localStorage.clear();



button.addEventListener('click', displayForcast)

function displayForcast() {
    
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName.value + '&appid=' + apiKey + '&units=metric';
   
    fetch(apiUrl)


    // we want the response in json format. no colone cause full function

        .then(response => response.json())
        .then((data)=> {
          
            getForecast(data)
            console.log(data)
            console.log(data.coord.lon)

            let unixTime= data['dt'];
            console.log(unixTime);
    
    const dateTimeString = moment.unix(unixTime).format("DD-MM-YYYY");
    console.log(dateTimeString);
        
        
        let citynameValue = data.name;
        let tempValue = data.main.temp;
        let icon = data.weather[0].icon;
        var windValue = data.wind.speed;
        var humid = data.main.humidity;

            let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            
            citySearch.innerHTML = citynameValue + '(' + dateTimeString + ')';
            cityIcon.setAttribute("src", iconUrl);
            
            displayCityWth.innerHTML = 'Temp: ' + tempValue + '  °C';
          
            displayWind.innerHTML = 'Wind speed: ' + windValue + ' MPH' ;
            displayHumid.innerHTML = 'Humidity: ' + humid + '%';
           
             if (localStorage.getItem(citynameValue) == null){
                 localStorage.setItem(citynameValue, citynameValue);
             }
            
            //console.log(cityNameHistory);

            while (cityHistory.firstChild) {
                cityHistory.removeChild(cityHistory.firstChild);
              }
            showCityNameHistory();

        })
    
    //to catch the error 
        .catch (Error => alert("Wrong City Name!"));
    }

// 

function getForecast(weatherData){
    
    
   

    let lon = weatherData.coord.lon;

    let lat = weatherData.coord.lat;
    let URL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';

    console.log(lon);
    console.log(lat);

    fetch(URL)
    .then(response => response.json())
    .then((data)=>{
        console.log(data);

        let dailyWeather = [];
        let currentDay = []; 
          // Split the data into separate 5 days
          data.list.forEach((e) => {
            if (currentDay.length === 0) {
              currentDay.push(e);
            } else {
              if (
                currentDay[currentDay.length - 1].dt_txt.split(" ")[0] !==
                e.dt_txt.split(" ")[0]
              ) {
                dailyWeather.push(currentDay);
                currentDay = [e];
              } else {
                currentDay.push(e);
              }
            }
          });
          if (currentDay.length !== 0) dailyWeather.push(currentDay);
          if (dailyWeather.length > 5) dailyWeather.shift();

         
          console.log(dailyWeather);
          console.log(dailyWeather[0][4].main.temp);
          console.log(dailyWeather[0][4].wind.speed);
          console.log(dailyWeather[0][4].main.humidity);
          console.log(dailyWeather[0][4].icon);
// day 1   
        
              
       
        let day1Temperature = dailyWeather[0][4].main.temp;
        
        let day1Windspeed = dailyWeather[0][4].wind.speed;
        let day1Humidity = dailyWeather[0][4].main.humidity;
         let icon1 = dailyWeather[0][4].weather[0].icon;
         let iconUrl1 = "http://openweathermap.org/img/w/" + icon1 + ".png";
         let unixTimeDay1 = dailyWeather[4][0]['dt'];
         let dateTimeString1= moment.unix(unixTimeDay1).format("DD-MM-YYYY");
         day1Date.innerHTML= dateTimeString1;  
         
          
          tempDay1.innerHTML='Temp: ' + day1Temperature + '°C';
           cityIcon1.setAttribute("src", iconUrl1);
          windDay1.innerHTML='Wind: ' + day1Windspeed + 'MPH';
          HumidDay1.innerHTML='Humidity: ' + day1Humidity + '%';
// day 2 

        let day2Temperature = dailyWeather[1][4].main.temp;
        let day2Windspeed = dailyWeather[1][4].wind.speed;
        let day2Humidity = dailyWeather[1][4].main.humidity;
        let icon2 = dailyWeather[1][4].weather[0].icon;
         let iconUrl2 = "http://openweathermap.org/img/w/" + icon2 + ".png";
         let unixTimeDay2 = dailyWeather[1][4]['dt'];
         let dateTimeString2= moment.unix(unixTimeDay2).format("DD-MM-YYYY");
         day2Date.innerHTML= dateTimeString2;  
          
  
         tempDay2.innerHTML='Temp: ' + day2Temperature + '°C';
          cityIcon2.setAttribute("src", iconUrl2);
          windDay2.innerHTML='Wind: ' + day2Windspeed + 'MPH';
          HumidDay2.innerHTML='Humidity: ' + day2Humidity + '%';

// day 3
        let day3Temperature = dailyWeather[2][4].main.temp;
        let day3Windspeed = dailyWeather[2][4].wind.speed;
        let day3Humidity = dailyWeather[2][4].main.humidity;
        let icon3 = dailyWeather[2][4].weather[0].icon;
        let iconUrl3 = "http://openweathermap.org/img/w/" + icon3 + ".png";
        let unixTimeDay3 = dailyWeather[2][4]['dt'];
        let dateTimeString3= moment.unix(unixTimeDay3).format("DD-MM-YYYY");
        day3Date.innerHTML= dateTimeString3;  
        
        
        tempDay3.innerHTML='Temp: ' + day3Temperature + '°C';
          cityIcon3.setAttribute("src", iconUrl3);
          windDay3.innerHTML='Wind: ' + day3Windspeed + 'MPH';
          HumidDay3.innerHTML='Humidity: ' + day3Humidity + '%';

//day 4
      let day4Temperature = dailyWeather[3][4].main.temp;
      let day4Windspeed = dailyWeather[3][4].wind.speed;
      let day4Humidity = dailyWeather[3][4].main.humidity;
      let icon4 = dailyWeather[3][4].weather[0].icon;
      let iconUrl4 = "http://openweathermap.org/img/w/" + icon4 + ".png";
      let unixTimeDay4 = dailyWeather[3][4]['dt'];
         let dateTimeString4= moment.unix(unixTimeDay4).format("DD-MM-YYYY");
         day4Date.innerHTML= dateTimeString4;   
        
        
      tempDay4.innerHTML='Temp: ' + day4Temperature + '°C';
          cityIcon4.setAttribute("src", iconUrl4);
          windDay4.innerHTML='Wind: ' + day4Windspeed + 'MPH';
          HumidDay4.innerHTML='Humidity: ' + day4Humidity + '%';

//day 5 forcast display

        let day5Temperature = dailyWeather[4][0].main.temp;
        let day5Windspeed = dailyWeather[4][0].wind.speed;
        let day5Humidity = dailyWeather[4][0].main.humidity;
        let icon5 = dailyWeather[4][0].weather[0].icon;
        let iconUrl5 = "http://openweathermap.org/img/w/" + icon5 + ".png";
        let unixTimeDay5 = dailyWeather[4][0]['dt'];
         let dateTimeString= moment.unix(unixTimeDay5).format("DD-MM-YYYY");
         day5Date.innerHTML= dateTimeString;   
        tempDay5.innerHTML='Temp: ' + day5Temperature + '°C';
          cityIcon5.setAttribute("src", iconUrl5);
          windDay5.innerHTML='Wind: ' + day5Windspeed + 'MPH';
          HumidDay5.innerHTML='Humidity: ' + day5Humidity + '%';
    })
}

//make history button

function showCityNameHistory(){
    
        for (let i=localStorage.length-1; i>=0; i--){ 
            const button = document.createElement('button');
            button.innerText = localStorage.getItem(localStorage.key(i));
            button.classList.add('btn');
            cityHistory.appendChild(button);
         
            // button.addEventListener('click', displayForcast);   
        }
    }