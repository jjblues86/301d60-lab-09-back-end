'use strict';
const superagent = require('superagent');



//Search Yelp
function searchRestaurants(request,response){
  const yelpDataUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${request.query.data.latitude}&longitude=${request.query.data.longitude}&limit=20`
  return superagent.get(yelpDataUrl)
    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then(foodData => {

      const yelpParse = JSON.parse(foodData.text);
      let yelpData = yelpParse.businesses.map( business => {
        let yelpObj = new Restuarants(business);
        return yelpObj;
      })
      //normalize the data
      response.status(200).send(yelpData);
    })
    .catch(err => { console.error(err)});
}

//Yelp Constructor
function Restuarants(business){
  this.name = business.name;
  this.image_url = business.image_url;
  this.price = business.price;
  this.rating = business.rating;
  this.url = business.url;
}

module.exports = searchRestaurants;
