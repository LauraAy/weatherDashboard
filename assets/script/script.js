let searches = JSON.parse(localStorage.getItem('searches')) || []

// event listener for search button
document.getElementById('searchCity').addEventListener('click', event => {
  event.preventDefault()

  searches.push({
    location: document.getElementById('city').value,
  })

  localStorage.setItem('searches', JSON.stringify(searches))

  
  fetch(`http://api.weatherapi.com/v1/forecast.json?key=ea4d3d5c304c48499f2204108200502&q=${document.getElementById('city').value}&days=5`)
    .then(r => r.json())
    .then(({ location, current, forecast, condition }) => {
  
      let cDate = moment(`${forecast.forecastday[0].date}`, 'YYYY-MM-DD').format('MMM-DD-YYYY');
      let currentElem = document.createElement('div')
      currentElem.innerHTML = `
        <div class="card  z-depth-2">
          <div class="card-content">
          <div class="row">
            <div class="col s6">
              <h5>${location.name}</h5>
              <h6>${cDate}</h6>
              <img src=${current.condition.icon}></img>
            </div>
            <div class="col s6">
              <div>Temp: ${current.temp_f}f</div>
              <div>${current.condition.text}</div>
              <div>Wind: ${current.wind_mph}mph</div>
              <div>Humidity: ${current.humidity}mph</div>
              <div id="uv">UV Index: ${current.uv}mph</div>
            </div>
          </div>
          </div>
        </div>
      `
      document.getElementById('displayCurrent').append(currentElem)

      for (var i = 1; i < 5; i++) {
    
        let forecastInfo = forecast.forecastday[i]
        let daily = forecastInfo.day
        let date = moment(`${forecastInfo.date}`, 'YYYY-MM-DD').format('MMM-DD-YYYY');

        let weatherElem = document.createElement('div')
        weatherElem.innerHTML = `
        
        <div class="card light-blue lighten-5 z-depth-2 col">
          <div class="card-content">
          <div class="section">
          <h6>${date}</h6>
          <div>High: ${daily.maxtemp_f}</div>
          <div>Low: ${daily.mintemp_f}</div>
          <div>Humidity: ${daily.avghumidity}</div>
          </div>
        </div>
       `
        document.getElementById('displayForecast').append(weatherElem)
      }

      const renderItems = _ => {
      document.getElementById('saved-searches').innerHTML = ''
      for (var x = 0; x < searches.length; x++) {
        let searchElem = document.createElement('div')
        searchElem.innerHTML = `
          <div class="card">
            <div class="card-content">
            <div>${searches[x].location}</div>
            </div>
          </div>
          `
        document.getElementById('saved-searches').append(searchElem) 
        console.log(searches[x].location)
        }
      }
      renderItems()
     
      
   
    })
})


// for (var i = 0; i < searches.length; i++) {
//   document.getElementById('saved-searches').innerHTML = `
//   ${searches[i]}
//   `
//   console.log(searches[i])
// }


   // let uv = parseInt(`${daily.uv}`);

        // if ( uv > 0 && uv <= 2 ){
        //   document.getElementById('uv').style.color = "green";
        // }
        // else if uv > 2 && uv <= 5 ){
        //   document.getElementById('uv').style.color = "yellow";
        // }
        // else if (uv > 5 ) {
        // document.getElementById('uv').style.color = "yellow";
        // }
