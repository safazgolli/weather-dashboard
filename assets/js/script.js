let apiKey ="3c25187c22c3811aac76c46a629ee3ce";
let cityName = document.querySelector('#city-input');
let citySearch = document.querySelector('#city-name');
let displayCityWth = document.querySelector('#temp-container');
let displayCityDesc= document.querySelector('#discrip');
let displayWind = document.querySelector('#wind');
let displayHumid = document.querySelector('#humidity');
let button= document.querySelector('#search-button');

button.addEventListener('click', function(){
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName.value + '&appid=' + apiKey + '&units=metric';
    fetch(apiUrl)

    
    // we want the response in json format. no colon cause full function

        .then(response => response.json())
        .then((data)=> {
            getForecast(data)
            console.log(data)
            console.log(data.coord.lon)

        
        var citynameValue = data.name;
        var tempValue = data.main.temp;
        var descValue = data.weather[0].description;
        var windValue = data.wind.speed;
        var humid = data.main.humidity;

            citySearch.innerHTML = citynameValue;
            displayCityWth.innerHTML = tempValue;
            displayCityDesc.innerHTML = descValue;
            displayWind.innerHTML = windValue;
            displayHumid.innerHTML = humid;

        })
    
    //to catch the error 
        .catch (err => alert("Wrong City Name!"))
})

// 

function getForecast(weatherData){
    
    //allow for template literals
    //consideration: isolate coordinates

    let lon = weatherData.coord.lon;

    let lat = weatherData.coord.lat;
    let URL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

    console.log(lon);
    console.log(lat);

    fetch(URL)
    .then(response => response.json())
    .then((data)=>{
        console.log(data);

        let dailyWeather = [];
          let currentDay = [];
          // Split the data into separate days
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

    });
}




// let getWeather = function (city) {
//     var queryURL  = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid='+apiKey;
  
//     fetch(queryURL)
//       .then(function (response) {
//         if (response.ok) {
//           console.log(response);
//           response.json().then(function (data) {
//             console.log(data);
//             displayWeather(data, city);
//           });
//         } else {
//           alert('Error: ' + response.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert('Unable to connect to OpenWeather');
//       });
//   };

//   let displayWeather = function( weather, searchTerm){

//