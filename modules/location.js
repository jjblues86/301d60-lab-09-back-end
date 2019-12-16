'use strict';
const superagent = require('superagent');
const pg = require('pg');



//postgres
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//Location Handler
function getLocation(request, response){
  let searchHandler = {
    cacheHit: (data) => {
      console.log('from the database');
      response.status(200).send(data);
    },
    cacheMiss: (query) => {
      return searchLatToLng(query)
        .then(result => {
          response.send(result);
        }).catch(err=>console.error(err));
    }
  }
  lookUpLocation(request.query.data, searchHandler);
}

// searching location from SQL
function lookUpLocation(query, handler){
  const SQL = 'SELECT * FROM locations WHERE search_query=$1';
  const values = [query];
  console.log(values);
  return client.query(SQL, values)
    .then(data => {
      if(data.rowCount){
        console.log('retrieved from database');
        handler.cacheHit(data.rows[0])
      } else {
        handler.cacheMiss(query);
      }
    })
    .catch(err => console.error(err));

}



//Search for location data
function searchLatToLng(query){
  const geoDataUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GEOCODING_API_KEY}`
  return superagent.get(geoDataUrl)

    .then(geoData => {
      console.log('hey from google',geoData)


      const location = new Location(geoData.body.results[0]);
      let SQL = `INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4) RETURNING id`;
console.log('this', [query, location.formatted_query, location.latitude, location.longitude])
      //store it in our DB
      return client.query(SQL, [query, location.formatted_query, location.latitude, location.longitude])
        .then((result) =>{
          console.log(result);
          console.log('stored to DB');
          location.id = result.rows[0].id
          return location;
        })
        .catch(err => console.error(err))
    })
}


//Location Constructor
function Location(location){
  this.formatted_query = location.formatted_address;
  this.latitude = location.geometry.location.lat;
  this.longitude = location.geometry.location.lng;
  this.long_name = location.address_components[0].long_name;
  this.search_query = location.search_query;
}

module.exports = getLocation;
