'use strict';
const superagent = require('superagent');


// //Search for Trails
function searchTrails(request, response){
  const trailDataUrl = `https://www.hikingproject.com/data/get-trails?lat=${request.query.data.latitude}&lon=${request.query.data.longitude}&key=${process.env.TRAIL_API_KEY}`
  return superagent.get(trailDataUrl)
    .then(trailsData => {

      const trailsParse = JSON.parse(trailsData.text);
      console.log('this', trailsParse)

      let trailObj = trailsParse.trails.map(trail => new Trails(trail))
      response.status(200).send(trailObj);
    })
    .catch(err => console.error(err));
}

//Trails Constructor
function Trails(trail){
  this.name = trail.name;
  this.location = trail.location;
  this.length = trail.length;
  this.stars = trail.stars;
  this.star_votes = trail.starVotes;
  this.summary = trail.summary;
  this.trail_url = trail.url;
  this.conditions = trail.conditionStatus;
  this.condition_date = trail.conditionDate;
  this.condition_time = trail.conditionDate;
}

module.exports = searchTrails;

