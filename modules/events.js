'use strict';
const superagent = require('superagent');

//Events
function Eventful(event){
  this.link = event.url;
  this.name = event.title;
  this.event_date = event.start_time;
  this.summary = event.description;
}

// Search for events
function searchEvents(request, response){
  const eventsDataUrl = `http://api.eventful.com/json/events/search?location=${request.query.data.formatted_query}&app_key=${process.env.EVENTBRITE_API_KEY}`
  return superagent.get(eventsDataUrl)
    .then(eventData => {

      const jsonData = JSON.parse(eventData.text)
      const events = jsonData.events.event;
      let eventArray = events.map(event => (new Eventful(event)));

      response.send(eventArray);
    })
    .catch(err => console.error(err));
}

module.exports = searchEvents;
