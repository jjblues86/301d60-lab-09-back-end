'use strict';
const superagent = require('superagent');


// Search for Weather data
function getWeather(request,response){
  const darkSkyDataUrl = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${request.query.data.latitude},${request.query.data.longitude}`
  return superagent.get(darkSkyDataUrl)
    .then(weatherData => {

      let weatheArray = weatherData.body.daily.data.map(forecast => (new Daily(forecast)));
      response.send(weatheArray);
    })
    .catch(err => console.error(err));
}

//Weather Constructor
function Daily(dailyForecast){
  this.forecast = dailyForecast.summary;
  this.time = new Date(dailyForecast.time * 1000).toDateString();
}

module.exports = getWeather;
