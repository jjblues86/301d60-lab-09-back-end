'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
// const superagent = require('superagent');
const pg = require('pg');
const PORT = process.env.PORT || 3000;

// Load ENV
require('dotenv').config();
let getLocation = require('./modules/location');
let getWeather = require('./modules/weather');
let searchEvents = require('./modules/events');
let searchMovie = require('./modules/movies');
let searchRestaurants = require('./modules/yelp');
let searchTrails = require('./modules/trails');

app.use(express.static('./public'));
app.use(cors());

//postgres
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('error', err => console.error(err));


//Routes
app.get('/', (request, response) => {
  response.send('What up, fam!');
});
app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/events', searchEvents);
app.get('/movies', searchMovie);
app.get('/yelp', searchRestaurants);
app.get('/trails', searchTrails);


app.listen(PORT, () => {
  console.log(`app running on PORT: ${PORT}`);
});
